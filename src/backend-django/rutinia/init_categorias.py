"""
Script para inicializar categorías en MongoDB para la aplicación Rutinia.
Ejecutar desde: backend-django/rutinia/
Comando: python manage.py shell < init_categorias.py
"""

from core.models import Categoria

# Categorías predefinidas
categorias = [
    'Salud',
    'Educación',
    'Bienestar',
    'Finanzas',
    'Trabajo',
    'Hogar',
    'Social',
    'Deporte',
    'Lectura',
    'Creatividad'
]

print("Inicializando categorías...")

for nombre in categorias:
    # Verificar si ya existe
    if not Categoria.objects.filter(nombre=nombre).first():
        categoria = Categoria(nombre=nombre)
        categoria.save()
        print(f"✓ Categoría creada: {nombre}")
    else:
        print(f"- Categoría ya existe: {nombre}")

print("\n✅ Proceso completado!")
print(f"Total de categorías en la base de datos: {Categoria.objects.count()}")

# Listar todas las categorías
print("\nCategorías disponibles:")
for cat in Categoria.objects.all():
    print(f"  - {cat.nombre} (ID: {cat.id})")
