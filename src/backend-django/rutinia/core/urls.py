from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, ToolViewSet, RolViewSet, CategoriaViewSet, RegistroHabitoViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'roles', RolViewSet, basename="rol")
router.register(r'tools', ToolViewSet, basename='tool')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'habitos/registros', RegistroHabitoViewSet, basename='registro')
urlpatterns = [
    path('', include(router.urls)),
]