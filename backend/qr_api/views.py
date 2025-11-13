from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum
from django.core.files.base import ContentFile
import qrcode
from io import BytesIO
import base64

from .models import QRCode
from .serializers import (
    QRCodeSerializer,
    QRCodeCreateSerializer,
    QRCodeStatsSerializer
)


class QRCodeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for QRCode operations.
    
    Endpoints:
    - POST /api/qr-codes/ - Generate a new QR code
    - GET /api/qr-codes/ - List all QR codes (filtered by device_id header)
    - GET /api/qr-codes/{id}/ - Get specific QR code details
    - DELETE /api/qr-codes/{id}/ - Delete a QR code
    - GET /api/qr-codes/history/ - Get QR history for device
    - GET /api/qr-codes/stats/ - Get QR statistics for device
    - POST /api/qr-codes/{id}/increment_scan/ - Increment scan count
    """
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer
    permission_classes = [AllowAny]
    
    def get_device_id(self):
        """Extract device ID from request headers"""
        return self.request.headers.get('X-Device-Id', '')
    
    def get_queryset(self):
        """Filter queryset by device ID from headers"""
        device_id = self.get_device_id()
        if device_id:
            return QRCode.objects.filter(device_id=device_id)
        return QRCode.objects.none()
    
    def create(self, request, *args, **kwargs):
        """Create a new QR code with image generation"""
        serializer = QRCodeCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create the QR code instance
        qr_instance = serializer.save()
        
        # Generate QR code image
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_instance.data)
        qr.make(fit=True)
        
        # Create image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save to BytesIO
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        # Save to model
        file_name = f'qr_{qr_instance.id}.png'
        qr_instance.qr_image.save(file_name, ContentFile(buffer.read()), save=True)
        
        # Return response
        output_serializer = QRCodeSerializer(qr_instance, context={'request': request})
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def history(self, request):
        """Get QR code history for the current device"""
        device_id = self.get_device_id()
        if not device_id:
            return Response(
                {'error': 'Device ID header (X-Device-Id) is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        qr_codes = QRCode.objects.filter(device_id=device_id).order_by('-created_at')
        
        # Pagination
        page = self.paginate_queryset(qr_codes)
        if page is not None:
            serializer = QRCodeSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = QRCodeSerializer(qr_codes, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get statistics for the current device's QR codes"""
        device_id = self.get_device_id()
        if not device_id:
            return Response(
                {'error': 'Device ID header (X-Device-Id) is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        qr_codes = QRCode.objects.filter(device_id=device_id)
        total_qr_codes = qr_codes.count()
        total_scans = qr_codes.aggregate(Sum('scan_count'))['scan_count__sum'] or 0
        
        stats_data = {
            'total_qr_codes': total_qr_codes,
            'total_scans': total_scans
        }
        
        serializer = QRCodeStatsSerializer(stats_data)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def increment_scan(self, request, pk=None):
        """Increment the scan count for a QR code"""
        qr_code = self.get_object()
        qr_code.increment_scan_count()
        serializer = QRCodeSerializer(qr_code, context={'request': request})
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        """Delete a QR code (only if it belongs to the device)"""
        instance = self.get_object()
        device_id = self.get_device_id()
        
        if instance.device_id != device_id:
            return Response(
                {'error': 'You can only delete your own QR codes'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
