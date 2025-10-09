from django.shortcuts import render

# Create your views here.
#from rest_framework import viewsets, status
from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from .models import Usuario, Habito, RegistroHabito, Rol, Categoria, Notificacion, Tool
from .serializers import UsuarioSerializer, RolSerializer, HabitoSerializer, CategoriaSerializer, RegistroHabitoSerializer, ToolSerializer, NotificacionSerializer


class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class RegistroHabitoViewSet(viewsets.ModelViewSet):
    queryset = RegistroHabito.objects.all()
    serializer_class = RegistroHabitoSerializer

class HabitoViewSet(viewsets.ModelViewSet):
    queryset = Habito.objects.all()
    serializer_class = HabitoSerializer
"""
class UsuarioViewSet(viewsets.ViewSet):
    
    def list(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        usuario = Usuario.objects.get(id=pk)
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            usuario = Usuario(**serializer.validated_data)
            usuario.save()
            return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""

class ToolViewSet(viewsets.ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = ToolSerializer

    def get_queryset(self):
        return Tool.objects.all()