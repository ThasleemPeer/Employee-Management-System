from rest_framework import serializers
from .models import *  # Assuming CustomUser, Task, etc., are defined in your models.

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'  # Serializing all fields of the CustomUser model

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields='__all__'

class TaskSerializer(serializers.ModelSerializer):
    # These fields are sourced from the 'assigned_to' relationship
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    assigned_to_user_type = serializers.CharField(source='assigned_to.user_type', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 
            'task_name', 
            'assigned_to',  # Still sending the whole object for 'assigned_to' in case it's needed
            'assigned_to_username', 
            'assigned_to_user_type', 
            'due_date', 
            'description', 
            'status'
        ]


