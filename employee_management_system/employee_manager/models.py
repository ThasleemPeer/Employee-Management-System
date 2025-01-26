from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES=(
        ('admin','Admin'),
        ('employee','Employee'),
    ) 
    user_type=models.CharField(max_length=10,choices=USER_TYPE_CHOICES,default='Employee')

    def __str__(self):
        return self.username



class Task(models.Model):
    STATUS_CHOICES=[
        ('pending','Pending'),
        ('completed','Completed'),
        ('ongoing','Ongoing'),
    ]
    task_name=models.CharField(max_length=255)
    assigned_to=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    due_date=models.DateField()
    description=models.TextField()
    status=models.CharField(max_length=700,choices=STATUS_CHOICES,default='pending')

    def __str__(self):
        return self.task_name

class fakedata(models.Model):
    name=models.CharField(max_length=100)