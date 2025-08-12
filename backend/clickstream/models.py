from django.db import models

class Clickstream(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    event_context = models.CharField(max_length=255)
    component = models.CharField(max_length=100)
    event_name = models.CharField(max_length=100)
    description = models.TextField()
    origin = models.CharField(max_length=20)
    ip_address = models.GenericIPAddressField()
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.time} - {self.event_name} - User: {self.user.username if self.user else 'Anonymous'}"

    @classmethod
    def log_event(cls, user, event_context, component, event_name, description, origin, ip_address, **kwargs):
        """
        Convenience method to log clickstream events with user information
        """
        return cls.objects.create(
            user=user,
            event_context=event_context,
            component=component,
            event_name=event_name,
            description=description,
            origin=origin,
            ip_address=ip_address,
            **kwargs
        )

    class Meta:
        ordering = ['-time']  # Most recent first
        verbose_name = "Clickstream Event"
        verbose_name_plural = "Clickstream Events"
