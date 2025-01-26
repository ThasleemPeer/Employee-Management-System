from django.urls import path
from .views import LoginAPIView, LogoutAPIView, AdminTaskAPIView, EmployeeTaskAPIView, EmployeedataAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('admin-tasks/', AdminTaskAPIView.as_view(), name='admin-tasks'),
    path('employee-tasks/<int:employee_id>/<int:id>/', EmployeeTaskAPIView.as_view(), name='employee-tasks'),  # Updated with <int:employee_id> and <int:id>
    path('employees/', EmployeedataAPIView.as_view(), name='employee')
]
