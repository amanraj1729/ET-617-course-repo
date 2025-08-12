from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Clickstream
from .serializers import ClickstreamSerializer
import logging

logger = logging.getLogger(__name__)

def get_client_ip(request):
    """
    Get the client IP address from the request.
    Handles various proxy scenarios and provides fallbacks.
    """
    # Try different headers in order of preference
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # Extract the first IP from the list
        ip = x_forwarded_for.split(',')[0].strip()
        if ip:
            logger.debug(f"Using HTTP_X_FORWARDED_FOR: {ip}")
            return ip
    
    # Try other common headers
    x_real_ip = request.META.get('HTTP_X_REAL_IP')
    if x_real_ip:
        logger.debug(f"Using HTTP_X_REAL_IP: {x_real_ip}")
        return x_real_ip
    
    # Fallback to REMOTE_ADDR
    remote_addr = request.META.get('REMOTE_ADDR')
    if remote_addr:
        logger.debug(f"Using REMOTE_ADDR: {remote_addr}")
        return remote_addr
    
    # Final fallback for development
    logger.warning("No IP address found in request headers, using fallback 127.0.0.1")
    return '127.0.0.1'

class ClickstreamLogView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            data = request.data.copy()
            
            # Get IP address using the utility function
            ip_address = get_client_ip(request)
            data['ip_address'] = ip_address
            
            # Do not set the user in data; it will be set during serializer.save()
            
            # Log the user and IP address being used for debugging
            logger.info(f"Logging clickstream for user: {request.user.username} (ID: {request.user.id}) with IP: {ip_address}")
            logger.debug(f"Full data being sent to serializer: {data}")
            
            serializer = ClickstreamSerializer(data=data)
            if serializer.is_valid():
                # Save the clickstream record, setting user from the request
                clickstream_record = serializer.save(user=request.user)
                
                # Log successful creation with user info
                logger.info(f"Clickstream record created successfully - ID: {clickstream_record.id}, User: {clickstream_record.user.username if clickstream_record.user else 'None'}")
                
                return Response({
                    "message": "Clickstream logged successfully",
                    "user": request.user.username,
                    "user_id": request.user.id,
                    "event": data.get('event_name', 'Unknown'),
                    "record_id": clickstream_record.id
                }, status=status.HTTP_201_CREATED)
            else:
                logger.error(f"Serializer validation failed: {serializer.errors}")
                logger.error(f"Data that failed validation: {data}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            logger.error(f"Error in ClickstreamLogView: {str(e)}")
            return Response(
                {"error": "Internal server error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
