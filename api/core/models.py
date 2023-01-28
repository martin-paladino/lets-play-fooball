from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    team_shield = models.ImageField(upload_to='team_shields/', blank=True, null=True)
    number_of_players = models.IntegerField(blank=True, null=True)
    average_age = models.FloatField(blank=True, null=True)
    country = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.name


class Player(models.Model):
    FOOT_CHOICES = [
        ('right', 'Derecho'),
        ('left', 'Izquierdo'),
        ('both', 'Ambos')
    ]

    name = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='players/', blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, blank=True, null=True, related_name='players')
    shirt_number = models.IntegerField(blank=False, null=False)
    position = models.CharField(max_length=50, blank=False, null=False)
    height = models.IntegerField(blank=False, null=False)
    weight = models.IntegerField(blank=False, null=False)
    birth_date = models.DateField(blank=False, null=False)
    age = models.IntegerField(blank=False, null=False)
    foot = models.CharField(max_length=10, choices=FOOT_CHOICES, blank=False, null=False)

    def __str__(self):
        return self.name
