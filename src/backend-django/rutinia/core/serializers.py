from rest_framework import serializers
from .models import Usuario, Habito, RegistroHabito, Rol, Categoria

class RolSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField(max_length=20)

class UsuarioSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    correo = serializers.EmailField()
    clave = serializers.CharField()
    tema = serializers.CharField()
    rol = serializers.PrimaryKeyRelatedField(queryset=Rol.objects)
    
    def to_representation(self, instance):
        """Convierte el ObjectId en string para que sea serializable"""
        rep = super().to_representation(instance)
        rep['id'] = str(instance.id)
        rep['rol'] = str(instance.rol.id) if instance.rol else None
        return rep

class CategoriaSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField()

class HabitoSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField()
    descripcion = serializers.CharField()
    dificultad = serializers.CharField()
    tipo_frecuencia = serializers.CharField()
    dias = serializers.ListField(child=serializers.CharField(), required=False)
    publico = serializers.BooleanField()
    activo = serializers.BooleanField()
    usuario = UsuarioSerializer()
    categoria = CategoriaSerializer()

class RegistroHabitoSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    fecha = serializers.DateField()
    estado = serializers.BooleanField()
    habito = HabitoSerializer()
