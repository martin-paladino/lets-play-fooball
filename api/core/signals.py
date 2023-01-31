from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from core.models import Player
from datetime import date


def update_team_info(sender, instance, **kwargs):
    team = instance.team
    if team:
        players = team.players.all()
        team.average_age = sum([p.age for p in players]) \
            / players.count() if players.count() > 0 else 0
        team.number_of_players = players.count()
        team.save()


@receiver(post_save, sender=Player)
def update_team_on_save(sender, instance, **kwargs):
    update_team_info(sender, instance, **kwargs)


@receiver(post_delete, sender=Player)
def update_team_on_delete(sender, instance, **kwargs):
    update_team_info(sender, instance, **kwargs)


@receiver(pre_save, sender=Player)
def calculate_age(sender, instance, **kwargs):
    today = date.today()
    instance.age = today.year - instance.birth_date.year - \
        ((today.month, today.day) < (instance.birth_date.month, instance.birth_date.day))
