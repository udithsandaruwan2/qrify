from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import uuid


class QRCode(models.Model):
    """
    Model to store QR code data and track history by device fingerprint.
    No user authentication - tracking is based on browser/device ID.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # The actual data/URL to encode in QR code
    data = models.TextField(help_text="URL or text data to encode in QR code")
    
    # Device fingerprint for history tracking (no user accounts)
    device_id = models.CharField(
        max_length=255,
        db_index=True,
        help_text="Browser/device fingerprint for tracking history"
    )
    
    # QR code image
    qr_image = models.ImageField(
        upload_to='qr_codes/',
        blank=True,
        null=True,
        help_text="Generated QR code image"
    )
    
    # Metadata
    scan_count = models.IntegerField(default=0, help_text="Number of times QR was accessed")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['device_id', '-created_at']),
        ]
    
    def __str__(self):
        return f"QR Code: {self.data[:50]}... ({self.device_id})"
    
    def increment_scan_count(self):
        """Increment the scan count when QR is accessed"""
        self.scan_count += 1
        self.save(update_fields=['scan_count'])
