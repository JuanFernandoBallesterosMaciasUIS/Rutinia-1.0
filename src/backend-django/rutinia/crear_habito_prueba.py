"""
Script para crear un hábito de prueba en la base de datos
"""
import os
import sys
import django
from datetime import date

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rutinia.settings')
django.setup()

from core.models import Habito, Usuario, Categoria

def crear_habito_prueba():
    """Crea un hábito de prueba si no existe"""
    
    # Crear o obtener usuario de prueba
    usuario, created = Usuario.objects.get_or_create(
        nombre_usuario='usuario_demo',
        defaults={
            'nombre': 'Usuario',
            'apellido': 'Demo',
            'correo': 'demo@rutinia.com',
            'contra': 'demo123',
            'fecha_nacimiento': date(2000, 1, 1)
        }
    )
    
    if created:
        print(f"✅ Usuario creado: {usuario.nombre_usuario} (ID: {usuario.id})")
    else:
        print(f"ℹ️  Usuario existente: {usuario.nombre_usuario} (ID: {usuario.id})")
    
    # Crear o obtener categoría
    categoria, created = Categoria.objects.get_or_create(
        nombre='Salud',
        defaults={
            'descripcion': 'Hábitos relacionados con la salud y el bienestar físico'
        }
    )
    
    if created:
        print(f"✅ Categoría creada: {categoria.nombre} (ID: {categoria.id})")
    else:
        print(f"ℹ️  Categoría existente: {categoria.nombre} (ID: {categoria.id})")
    
    # Crear hábito de prueba
    habito, created = Habito.objects.get_or_create(
        nombre='Beber 8 vasos de agua',
        usuario=usuario,
        defaults={
            'categoria': categoria,
            'descripcion': 'Mantenerme hidratado tomando 8 vasos de agua al día',
            'dificultad': 'Fácil',
            'fecha_inicio': date.today(),
            'tipo_frecuencia': 'Diaria',
            'dias': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            'publico': True,
            'activo': True,
            'notificaciones': True
        }
    )
    
    if created:
        print(f"✅ Hábito creado: '{habito.nombre}' (ID: {habito.id})")
        print(f"   📋 Descripción: {habito.descripcion}")
        print(f"   📊 Dificultad: {habito.dificultad}")
        print(f"   📅 Frecuencia: {habito.tipo_frecuencia}")
        print(f"   🗓️  Días: {', '.join(habito.dias)}")
    else:
        print(f"ℹ️  Hábito ya existente: '{habito.nombre}' (ID: {habito.id})")
    
    # Crear un segundo hábito
    habito2, created = Habito.objects.get_or_create(
        nombre='Hacer ejercicio',
        usuario=usuario,
        defaults={
            'categoria': categoria,
            'descripcion': 'Realizar 30 minutos de ejercicio cardiovascular',
            'dificultad': 'Moderado',
            'fecha_inicio': date.today(),
            'tipo_frecuencia': 'Semanal',
            'dias': ['Lunes', 'Miércoles', 'Viernes'],
            'publico': True,
            'activo': True,
            'notificaciones': True
        }
    )
    
    if created:
        print(f"✅ Hábito creado: '{habito2.nombre}' (ID: {habito2.id})")
        print(f"   📋 Descripción: {habito2.descripcion}")
        print(f"   📊 Dificultad: {habito2.dificultad}")
        print(f"   📅 Frecuencia: {habito2.tipo_frecuencia}")
        print(f"   🗓️  Días: {', '.join(habito2.dias)}")
    else:
        print(f"ℹ️  Hábito ya existente: '{habito2.nombre}' (ID: {habito2.id})")
    
    print("\n" + "="*60)
    print("🎉 ¡Base de datos lista!")
    print("="*60)
    print(f"\n📊 Resumen:")
    print(f"   👤 Usuario ID: {usuario.id}")
    print(f"   📁 Categoría ID: {categoria.id}")
    print(f"   📝 Hábitos totales: {Habito.objects.filter(usuario=usuario).count()}")
    print(f"\n💡 Actualiza la página de React para ver los hábitos")
    print(f"   URL: http://localhost:5173")

if __name__ == '__main__':
    try:
        crear_habito_prueba()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
