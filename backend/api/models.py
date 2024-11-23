from datetime import datetime, timedelta

from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.utils import timezone


class UserProfile(models.Model):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        NORMAL = "normal", "Normal"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=50, choices=Role.choices, default=Role.NORMAL)

    def __str__(self):
        return self.user.username
