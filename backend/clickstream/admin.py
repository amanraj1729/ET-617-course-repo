from django.contrib import admin
from .models import Clickstream

@admin.register(Clickstream)
class ClickstreamAdmin(admin.ModelAdmin):
    list_display = ('time', 'user', 'event_name', 'component', 'event_context', 'origin', 'ip_address')
    list_filter = ('user', 'event_name', 'component', 'origin', 'time')
    search_fields = ('user__username', 'event_name', 'description', 'event_context')
    readonly_fields = ('time',)
    date_hierarchy = 'time'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')