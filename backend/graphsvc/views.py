from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from profiles.models import Profile
from .cache import load_edges_and_index
from .ppr import build_transition, ppr_single
import numpy as np

User = get_user_model()

def jaccard(a, b):
    if not a or not b: return 0.0
    sa, sb = set(a), set(b)
    inter = len(sa & sb)
    union = len(sa | sb) or 1
    return inter / union

class PeopleRecsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        me = request.user
        limit = int(request.query_params.get("limit", 40))
        alpha = float(request.query_params.get("alpha", 0.15))

        index, edges = load_edges_and_index()
        if me.id not in index:
            return Response({"results": []})

        P = build_transition(edges)
        pi = ppr_single(P, index[me.id], alpha=alpha, iters=20)

        # candidates: top by PPR, exclude self + existing connections
        connected = set(User.objects.filter(
            id__in=[me.id]  # placeholder; swap for a proper connection query
        ).values_list("id", flat=True))

        top_idx = np.argsort(-pi)[:2000]
        candidates = []
        me_prof = Profile.objects.select_related("user").get(user=me)
        for idx in top_idx:
            # map idx back to user id
            # rebuild reverse index:
            rev = {v:k for k,v in index.items()}
            uid = rev[idx]
            if uid == me.id or uid in connected: continue
            try:
                p = Profile.objects.select_related("user").get(user_id=uid)
            except Profile.DoesNotExist:
                continue

            # simple hybrid score: PPR + content signals
            cos = float((me_prof.vector @ p.vector) / (1e-6 + np.linalg.norm(me_prof.vector) * np.linalg.norm(p.vector))) if (me_prof.vector is not None and p.vector is not None) else 0.0
            s = 0.6 * float(pi[idx]) + 0.25 * cos + 0.15 * jaccard(me_prof.interests.values_list("name", flat=True), p.interests.values_list("name", flat=True))
            candidates.append({"user_id": uid, "display_name": p.display_name or p.user.username, "score": s})

        # MMR re-rank (diversity)
        candidates.sort(key=lambda x: -x["score"])
        return Response({"results": candidates[:limit]})
