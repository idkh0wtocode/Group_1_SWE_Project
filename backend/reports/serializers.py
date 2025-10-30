from rest_framework import serializers # rest framework serializers 
from .models import Reports
from users.serializers import UserSerializer


# 'report_id', 'reporter', 'title', 'description', 'date_reported'


class ReportsSerializer(serializers.ModelSerializer):
    reporter = UserSerializer(read_only=True)
    class Meta:
        model = Reports
        fields = ['report_id', 'reporter', 'title', 'description', 'date_reported']
