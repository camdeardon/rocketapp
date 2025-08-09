# profiles/models.py
from django.db import models
from django.conf import settings
from django.utils import timezone
from pgvector.django import VectorField
from django.utils import timezone as dj_timezone


class Skill(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self) -> str:
        return self.name


class Interest(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self) -> str:
        return self.name


class Profile(models.Model):
    ROLE_CHOICES = [
        ("founder", "Founder"),
        ("joiner", "Joining a team"),
        ("undecided", "Undecided"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    # Core identity
    first_name = models.CharField(max_length=60, blank=True)
    last_name = models.CharField(max_length=60, blank=True)
    display_name = models.CharField(max_length=120, blank=True)

    # Matching surface
    bio = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    timezone = models.CharField(max_length=64, blank=True)  # field name is fine now
    availability_hrs_week = models.PositiveSmallIntegerField(default=10)
    role = models.CharField(max_length=32, choices=ROLE_CHOICES, blank=True)

    # Structured affinities
    skills = models.ManyToManyField(Skill, blank=True)
    interests = models.ManyToManyField(Interest, blank=True)

    # Embeddings for semantic matching (pgvector)
    vector = VectorField(dimensions=384, null=True, blank=True)

    # Lifecycle
    onboarding_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=dj_timezone.now, editable=False)  # ✅ use alias
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        name = f"{self.first_name} {self.last_name}".strip()
        return self.display_name or name or self.user.username