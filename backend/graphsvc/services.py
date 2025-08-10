import math
from django.utils import timezone
from datetime import timedelta
from django.db import transaction
from .models import Edge

DECAY_HALF_LIFE_DAYS = 30
LAMBDA = math.log(2) / (DECAY_HALF_LIFE_DAYS*24*3600)

EVENT_WEIGHTS = {
    "connect_accept": 2.0,
    "meeting": 1.0,
    "message": 0.3,
    "reply": 0.6,
    "like": 0.1,
    "view": 0.02,
    "collab_start": 3.0,
}

def _decay(old, dt_seconds):
    return old * math.exp(-LAMBDA * dt_seconds)

@transaction.atomic
def apply_event(actor_id: int, target_id: int, etype: str, when=None):
    when = when or timezone.now()
    base = EVENT_WEIGHTS.get(etype, 0.0)
    for src, dst in ((actor_id, target_id), (target_id, actor_id)):
        e, _ = Edge.objects.select_for_update().get_or_create(src_id=src, dst_id=dst, defaults={"weight": 0.0})
        dt = (when - e.updated_at).total_seconds() if e.updated_at else 0
        e.weight = _decay(e.weight, dt) + base
        e.save(update_fields=["weight","updated_at"])
