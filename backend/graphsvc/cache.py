# backend/graphsvc/cache.py
from django.contrib.auth import get_user_model
from .models import Edge

User = get_user_model()

def load_edges_and_index():
    """
    Returns:
      index: dict {user_id -> 0..N-1}
      edges: list of (src_idx, dst_idx, weight)
    """
    uids = list(User.objects.values_list("id", flat=True).order_by("id"))
    index = {uid: i for i, uid in enumerate(uids)}
    edges = []
    for src_id, dst_id, w in Edge.objects.values_list("src_id", "dst_id", "weight"):
        if src_id in index and dst_id in index:
            edges.append((index[src_id], index[dst_id], float(w)))
    return index, edges
