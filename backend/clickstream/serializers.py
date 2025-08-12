from rest_framework import serializers
from .models import Clickstream
from users.serializers import UserSerializer

class ClickstreamSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Clickstream
        fields = '__all__'
        read_only_fields = ['time']
