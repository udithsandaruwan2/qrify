from rest_framework import serializers
from .models import QRCode


class QRCodeSerializer(serializers.ModelSerializer):
    """Serializer for QRCode model"""
    
    qr_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = QRCode
        fields = [
            'id',
            'data',
            'device_id',
            'qr_image',
            'qr_image_url',
            'scan_count',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'qr_image', 'qr_image_url', 'scan_count', 'created_at', 'updated_at']
    
    def get_qr_image_url(self, obj):
        """Get the full URL for the QR code image"""
        if obj.qr_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.qr_image.url)
        return None


class QRCodeCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating QR codes"""
    
    class Meta:
        model = QRCode
        fields = ['data', 'device_id']
    
    def validate_data(self, value):
        """Validate that data is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Data cannot be empty")
        return value.strip()
    
    def validate_device_id(self, value):
        """Validate that device_id is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Device ID cannot be empty")
        return value.strip()


class QRCodeStatsSerializer(serializers.Serializer):
    """Serializer for QR code statistics"""
    total_qr_codes = serializers.IntegerField()
    total_scans = serializers.IntegerField()
