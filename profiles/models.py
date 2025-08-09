from django.db import models
from accounts.models import User
from pgvector.django import VectorField

class Skill(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name

class Interest(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    ROLE_CHOICES = [
        ("founder", "Founder"),
        ("joiner", "Joining a team"),
        ("undecided", "Undecided"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    bio = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    timezone = models.CharField(max_length=64, blank=True)
    availability_hrs_week = models.PositiveSmallIntegerField(default=10)
    role = models.CharField(max_length=32, choices=ROLE_CHOICES)
    skills = models.ManyToManyField(Skill, blank=True)
    interests = models.ManyToManyField(Interest, blank=True)
    vector = VectorField(dimensions=384, null=True)
    onboarding_completed = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
