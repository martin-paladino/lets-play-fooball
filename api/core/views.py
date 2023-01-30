from rest_framework import filters, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from core.models import Player, Team
from core.serializers import PlayerSerializer, TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
