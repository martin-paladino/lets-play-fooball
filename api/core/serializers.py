from . import models
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = '__all__'
        read_only_fields = ('average_age', 'number_of_players',)


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Player
        fields = '__all__'
        read_only_fields = ('age',)
