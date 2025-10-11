# -*- coding: utf-8 -*-
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rutinia.settings')
django.setup()

from core.models import Habito, Usuario, Categoria
from datetime import date

print("Creating sample data...")

# Create user
try:
    usuario = Usuario.objects.get(correo='demo@rutinia.com')
    print(f"User exists: {usuario.nombre} (ID: {usuario.id})")
except Usuario.DoesNotExist:
    usuario = Usuario(
        nombre='Usuario',
        apellido='Demo',
        correo='demo@rutinia.com',
        clave='demo123',
        tema='light'
    )
    usuario.save()
    print(f"User created: {usuario.nombre} (ID: {usuario.id})")

# Create category
categoria = Categoria.objects.filter(nombre='Salud').first()
if categoria:
    print(f"Category exists: {categoria.nombre} (ID: {categoria.id})")
else:
    categoria = Categoria(nombre='Salud')
    categoria.save()
    print(f"Category created: {categoria.nombre} (ID: {categoria.id})")

# Create habits
habits_data = [
    {
        'nombre': 'Beber 8 vasos de agua',
        'descripcion': 'Mantenerme hidratado tomando 8 vasos de agua al dia',
        'dificultad': 'Facil',
        'tipo_frecuencia': 'Diaria',
        'dias': ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    },
    {
        'nombre': 'Hacer ejercicio',
        'descripcion': 'Realizar 30 minutos de ejercicio cardiovascular',
        'dificultad': 'Moderado',
        'tipo_frecuencia': 'Semanal',
        'dias': ['Lunes', 'Miercoles', 'Viernes']
    },
    {
        'nombre': 'Meditar 10 minutos',
        'descripcion': 'Practicar meditacion mindfulness cada manana',
        'dificultad': 'Facil',
        'tipo_frecuencia': 'Diaria',
        'dias': ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    },
]

created_count = 0

for data in habits_data:
    try:
        habito = Habito.objects.get(nombre=data['nombre'], usuario=usuario)
        print(f"Habit exists: {habito.nombre}")
    except Habito.DoesNotExist:
        habito = Habito(
            usuario=usuario,
            categoria=categoria,
            nombre=data['nombre'],
            descripcion=data['descripcion'],
            dificultad=data['dificultad'],
            fecha_inicio=date.today(),
            tipo_frecuencia=data['tipo_frecuencia'],
            dias=data['dias'],
            publico=True,
            activo=True,
            notificaciones=[]
        )
        habito.save()
        created_count += 1
        print(f"Habit created: {habito.nombre} (ID: {habito.id})")

print("\nSummary:")
print(f"  User: {usuario.nombre} {usuario.apellido} (ID: {usuario.id})")
print(f"  Category: {categoria.nombre}")
print(f"  New habits: {created_count}")
print(f"  Total habits: {Habito.objects.filter(usuario=usuario).count()}")
print("\nEndpoints:")
print("  http://localhost:8000/api/habitos/")
print("\nReload React: http://localhost:5173")
