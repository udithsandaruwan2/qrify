from django.contrib import admin
from .models import QRCode


@admin.register(QRCode)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'data', 'device_id', 'created_at', 'scan_count')
    list_filter = ('created_at',)
    search_fields = ('data', 'device_id')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
