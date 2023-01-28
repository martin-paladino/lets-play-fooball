from rest_framework import filters
from rest_framework import viewsets
from core.models import Player, Team
from core.serializers import PlayerSerializer, TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)