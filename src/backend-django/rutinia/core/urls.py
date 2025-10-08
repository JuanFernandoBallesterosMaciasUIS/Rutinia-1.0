from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, ToolViewSet, RolViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'roles', RolViewSet, basename="rol")
router.register(r'tools', ToolViewSet, basename='tool')
urlpatterns = [
    path('', include(router.urls)),
]