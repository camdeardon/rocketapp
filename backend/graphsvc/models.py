from django.db import models
from django.conf import settings

class Edge(models.Model):
    # store *directed* rows for convenience; we’ll symmetrize when building P
    src = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    dst = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    weight = models.FloatField(default=0.0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("src","dst")
        indexes = [models.Index(fields=["src","dst"])]
