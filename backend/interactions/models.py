from django.db import models
from django.conf import settings

class Interaction(models.Model):
    VIEW, LIKE, CONNECT_REQ, CONNECT_ACCEPT, MESSAGE, REPLY, MEETING, COLLAB_START, COLLAB_END = (
        "view","like","connect_req","connect_accept","message","reply","meeting","collab_start","collab_end"
    )
    TYPES = [(t,t) for t in [VIEW,LIKE,CONNECT_REQ,CONNECT_ACCEPT,MESSAGE,REPLY,MEETING,COLLAB_START,COLLAB_END]]

    actor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="events_out")
    target = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="events_in")
    type = models.CharField(max_length=20, choices=TYPES)
    ts = models.DateTimeField(auto_now_add=True)
    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [models.Index(fields=["actor","target","ts"])]
