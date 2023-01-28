from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from core.models import Player

@receiver(post_save, sender=Player)
def update_team_average_age(sender, instance, **kwargs):
    team = instance.team
    players = team.players.all()
    average_age = sum([p.age for p in players]) / players.count()
    team.average_age = average_age
    team.save()

@receiver(post_delete, sender=Player)
def update_team_average_age(sender, instance, **kwargs):
    team = instance.team
    players = team.players.all()
    average_age = sum([p.age for p in players]) / players.count()
    team.average_age = average_age
    team.save()