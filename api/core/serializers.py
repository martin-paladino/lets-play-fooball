from . import models
from rest_framework import serializers


class PlayerSerialzerNested(serializers.ModelSerializer):
    class Meta:
        model = models.Player
        fields = ('id', 'name')


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerialzerNested(many=True, read_only=True)

    class Meta:
        model = models.Team
        fields = '__all__'
        read_only_fields = ('average_age', 'number_of_players', 'players')


class PlayerSerializer(serializers.ModelSerializer):
    position = serializers.CharField(required=False)
    team_id = serializers.IntegerField(write_only=True, required=False)
    team = TeamSerializer(read_only=True)
    picture = serializers.ImageField(required=False)
    
    class Meta:
        model = models.Player
        fields = '__all__'
        read_only_fields = ('age', 'team', 'id')
