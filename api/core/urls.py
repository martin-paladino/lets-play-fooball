from rest_framework import routers
from .views import TeamViewSet, PlayerViewSet

router = routers.DefaultRouter()

router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)

urlpatterns = router.urls
