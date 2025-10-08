from django.db import models

# Create your models here.
from mongoengine import (
    Document, EmbeddedDocument, fields
)


# --- Rol ---
class Rol(Document):
    nombre = fields.StringField(max_length=20, unique=True)


# --- Usuario ---
class Usuario(Document):
    nombre = fields.StringField(max_length=50)
    apellido = fields.StringField(max_length=50)
    correo = fields.EmailField(max_length=100, unique=True)
    clave = fields.StringField(max_length=100)
    tema = fields.StringField(max_length=20)
    rol = fields.ReferenceField(Rol)

# --- Categoría ---
class Categoria(Document):
    nombre = fields.StringField(max_length=50)


# --- Notificación ---
class Notificacion(EmbeddedDocument):
    hora = fields.DateTimeField()


# --- Hábito ---
class Habito(Document):
    usuario = fields.ReferenceField(Usuario)
    categoria = fields.ReferenceField(Categoria)
    nombre = fields.StringField(max_length=50)
    descripcion = fields.StringField(max_length=100)
    dificultad = fields.StringField(max_length=50)
    fecha_inicio = fields.DateField()
    tipo_frecuencia = fields.StringField(max_length=50)
    dias = fields.ListField(fields.StringField(), required=False)
    publico = fields.BooleanField(default=False)
    activo = fields.BooleanField(default=True)
    notificaciones = fields.EmbeddedDocumentListField(Notificacion)


# --- Registro de Hábito ---
class RegistroHabito(Document):
    habito = fields.ReferenceField(Habito)
    fecha = fields.DateField()
    estado = fields.BooleanField()
