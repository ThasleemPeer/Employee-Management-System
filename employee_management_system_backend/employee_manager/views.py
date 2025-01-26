

# Create your views here.

#login api to check whether the current user is an emp or admin
from django.contrib.auth import get_user_model

User = get_user_model()
# views.py
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import TaskSerializer  # Ensure from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from .models import Task
from .serializers import *

from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()
# views.py

from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from django.contrib.auth import logout

# Ensure the correct user model is being used
User = get_user_model()

# Login API to check whether the current user is an emp or admin
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Get the user object using email
            user = User.objects.get(email=email)
            
            # Check if password is correct
            if user.check_password(password):  # Validate password
                # If the password is correct, check user type
                if user.user_type == 'admin':
                    tasks = Task.objects.all()  # Get all tasks for admin
                    return Response({
                        'message': 'Admin login successful',
                        'user_type': 'admin',
                        'tasks': TaskSerializer(tasks, many=True).data,
                        'name': user.username
                    })
                elif user.user_type == 'employee':
                    tasks = Task.objects.filter(assigned_to=user)  # Get tasks for the employee
                    return Response({
                        'message': 'Employee login successful',
                        'user_type': 'employee',
                        'name': user.username,
                        'tasks': TaskSerializer(tasks, many=True).data
                    })
                else:
                    return Response({'error': 'Unknown user type'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            # If the user does not exist
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


# Admin can create tasks for employees and be able to see all tasks
class AdminTaskAPIView(APIView):
    def post(self, request):
        """
        Admin creates tasks for employees with additional fields.
        """
        assigned_to_id = request.data.get("assigned_to")
        task_name = request.data.get("task_name")
        due_date = request.data.get("due_date")
        description = request.data.get("description")
        project_status=request.data.get('status')
        
        try:
            assigned_to = CustomUser.objects.get(id=assigned_to_id)  # Ensure valid employee
            task = Task.objects.create(
                task_name=task_name,
                assigned_to=assigned_to,
                due_date=due_date,
                description=description,
                status=project_status
            )
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        """
        Admin retrieves all tasks.
        """
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)




# Employee views their assigned roles
# Employee views their assigned roles
class EmployeeTaskAPIView(APIView):
    def get(self, request, employee_id):
        try:
            user = CustomUser.objects.get(id=employee_id)  # Ensure correct employee model is used
            tasks = Task.objects.filter(assigned_to=user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, employee_id, id):
        """
        Update task status for an employee. The task ID is also passed to find the specific task.
        """
        try:
            task = Task.objects.get(id=id, assigned_to=request.user)  # Ensure correct task is fetched
            task.status = 'completed'  # or use request.data.get('status') to update status dynamically
            task.save()
            return Response({"message": "Task status updated to completed"})
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

# Employee data API
class EmployeedataAPIView(APIView):
    def get(self, request):
        employees = CustomUser.objects.filter(user_type='employee')
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

from rest_framework.viewsets import ModelViewSet


from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admin view
            return Task.objects.all()
        return Task.objects.filter(assigned_to=user)  # Employee view

# Logout API
class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

