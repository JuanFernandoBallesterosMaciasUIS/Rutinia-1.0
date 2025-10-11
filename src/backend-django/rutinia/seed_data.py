"""
Script simple para crear datos de prueba
Ejecutar con: python manage.py shell < seed_data.py
"""

from core.models import Habito, Usuario, Categoria
from datetime import date

print("\n" + "="*60)
print("🌱 Creando datos de prueba para Rutinia")
print("="*60 + "\n")

# 1. Crear usuario
try:
    usuario = Usuario.objects.get(correo='demo@rutinia.com')
    print(f"ℹ️  Usuario existente: {usuario.nombre} {usuario.apellido} (ID: {usuario.id})")
except Usuario.DoesNotExist:
    usuario = Usuario(
        nombre='Usuario',
        apellido='Demo',
        correo='demo@rutinia.com',
        clave='demo123',
        tema='light'
    )
    usuario.save()
    print(f"✅ Usuario creado: {usuario.nombre} {usuario.apellido} (ID: {usuario.id})")

# 2. Crear categoría
try:
    categoria = Categoria.objects.get(nombre='Salud')
    print(f"ℹ️  Categoría existente: {categoria.nombre} (ID: {categoria.id})")
except Categoria.DoesNotExist:
    categoria = Categoria(
        nombre='Salud',
        descripcion='Hábitos relacionados con la salud y el bienestar físico'
    )
    categoria.save()
    print(f"✅ Categoría creada: {categoria.nombre} (ID: {categoria.id})")

# 3. Crear hábitos de prueba
habitos_data = [
    {
        'nombre': 'Beber 8 vasos de agua',
        'descripcion': 'Mantenerme hidratado tomando 8 vasos de agua al día',
        'dificultad': 'Fácil',
        'tipo_frecuencia': 'Diaria',
        'dias': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    {
        'nombre': 'Hacer ejercicio',
        'descripcion': 'Realizar 30 minutos de ejercicio cardiovascular',
        'dificultad': 'Moderado',
        'tipo_frecuencia': 'Semanal',
        'dias': ['Lunes', 'Miércoles', 'Viernes']
    },
    {
        'nombre': 'Meditar 10 minutos',
        'descripcion': 'Practicar meditación mindfulness cada mañana',
        'dificultad': 'Fácil',
        'tipo_frecuencia': 'Diaria',
        'dias': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    {
        'nombre': 'Leer 30 minutos',
        'descripcion': 'Dedicar tiempo a la lectura antes de dormir',
        'dificultad': 'Moderado',
        'tipo_frecuencia': 'Diaria',
        'dias': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    }
]

print("\n📝 Creando hábitos...")
habitos_creados = 0

for data in habitos_data:
    try:
        habito = Habito.objects.get(nombre=data['nombre'], usuario=usuario)
        print(f"   ⏭️  '{habito.nombre}' ya existe")
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
        habitos_creados += 1
        print(f"   ✅ '{habito.nombre}' creado (ID: {habito.id})")

print("\n" + "="*60)
print("🎉 ¡Proceso completado!")
print("="*60)
print(f"\n📊 Resumen:")
print(f"   👤 Usuario: {usuario.nombre} {usuario.apellido} (ID: {usuario.id})")
print(f"   📁 Categoría: {categoria.nombre}")
print(f"   📝 Hábitos nuevos: {habitos_creados}")
print(f"   📝 Hábitos totales: {Habito.objects.filter(usuario=usuario).count()}")
print(f"\n🌐 Endpoints disponibles:")
print(f"   • http://localhost:8000/api/habitos/")
print(f"   • http://localhost:8000/api/categorias/")
print(f"   • http://localhost:8000/api/usuarios/")
print(f"\n💡 Recarga la página de React para ver los hábitos:")
print(f"   http://localhost:5173")
print("\n")
