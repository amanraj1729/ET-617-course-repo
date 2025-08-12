from django.db import models
from django.contrib.auth.models import AbstractUser

AGE_GROUP_CHOICES = [
    ('under_18', 'Under 18'),
    ('18_25', '18-25'),
    ('26_35', '26-35'),
    ('36_50', '36-50'),
    ('50_plus', '50+'),
]

class CustomUser(AbstractUser):
    age_group = models.CharField(max_length=10, choices=AGE_GROUP_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.username

    REQUIRED_FIELDS = ['age_group', 'email', 'phone_number']
