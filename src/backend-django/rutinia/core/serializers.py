from rest_framework import serializers
from rest_framework_mongoengine import serializers as mon

from .models import Usuario, Habito, RegistroHabito, Rol, Categoria, Notificacion, Tool

class ToolSerializer(mon.DocumentSerializer):
    class Meta:
        model = Tool
        fields = '__all__'

class RolSerializer(mon.DocumentSerializer):
    class Meta:
        model = Rol
        fields = '__all__'


class UsuarioSerializer(mon.DocumentSerializer):
    rol = serializers.CharField()  # Solo se usa para crear con id

    class Meta:
        model = Usuario
        fields = '__all__'

    def to_representation(self, instance):
        #Muestra el rol completo al hacer GET
        data = super().to_representation(instance)
        if instance.rol:
            data['rol'] = RolSerializer(instance.rol).data
        return data
    
    

"""
class RolSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField(max_length=20)
"""


"""
class UsuarioSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    correo = serializers.EmailField()
    clave = serializers.CharField()
    tema = serializers.CharField()
    rol = serializers.PrimaryKeyRelatedField(queryset=Rol.objects)
    
    def to_representation(self, instance):
        #Convierte el ObjectId en string para que sea serializable
        rep = super().to_representation(instance)
        rep['id'] = str(instance.id)
        rep['rol'] = str(instance.rol.id) if instance.rol else None
        return rep

"""

class NotificacionSerializer(mon.EmbeddedDocumentSerializer):
    class Meta:
        model = Notificacion
        fields = ['hora']

class CategoriaSerializer(mon.DocumentSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

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

class RegistroHabitoSerializer(mon.DocumentSerializer):
    class Meta:
        model = RegistroHabito
        fields = '__all__'