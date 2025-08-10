from django.db import models
from django.conf import settings
from django.db.models import Q, F

class Connection(models.Model):
    PENDING, ACCEPTED, BLOCKED = "pending","accepted","blocked"
    STATUSES = [(PENDING,PENDING),(ACCEPTED,ACCEPTED),(BLOCKED,BLOCKED)]

    user_a = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    user_b = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    status = models.CharField(max_length=16, choices=STATUSES, default=PENDING)
    initiator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user_a","user_b"], name="uniq_conn_pair"),
            models.CheckConstraint(check=Q(user_a__lt=F("user_b")), name="conn_ordered_pair"),
        ]