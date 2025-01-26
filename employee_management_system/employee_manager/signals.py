from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Task

channel_layer = get_channel_layer()

@receiver(post_save, sender=Task)
def notify_task_created_or_updated(sender, instance, created, **kwargs):
    message = {
        'type': 'task_update',
        'event': 'created' if created else 'updated',
        'task': {
            'id': instance.id,
            'task_name': instance.task_name,
            'assigned_to': instance.assigned_to.username,
            'status': instance.status,
        }
    }
    async_to_sync(channel_layer.group_send)('task_updates', message)

@receiver(post_delete, sender=Task)
def notify_task_deleted(sender, instance, **kwargs):
    message = {
        'type': 'task_update',
        'event': 'deleted',
        'task': {
            'id': instance.id,
        }
    }
    async_to_sync(channel_layer.group_send)('task_updates', message)
