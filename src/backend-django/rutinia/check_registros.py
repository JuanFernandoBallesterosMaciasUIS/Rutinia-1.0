#!/usr/bin/env python
"""Script para verificar registros duplicados"""
import os
import sys
import django
from datetime import date, timedelta

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rutinia.settings')
django.setup()

from core.models import Habito, RegistroHabito

# Obtener hábito "Leer"
habito = Habito.objects(nombre='Leer').first()
if not habito:
    print("No se encontró el hábito 'Leer'")
    sys.exit(1)

print(f"\n{'='*60}")
print(f"Hábito: {habito.nombre}")
print(f"Tipo: {habito.tipo_frecuencia}")
print(f"Días configurados: {habito.dias}")
print(f"{'='*60}\n")

# Calcular semana actual (Lunes a Domingo)
hoy = date.today()
inicio_semana = hoy - timedelta(days=hoy.weekday())  # Lunes
fin_semana = inicio_semana + timedelta(days=6)        # Domingo

print(f"Hoy: {hoy} ({hoy.strftime('%A')})")
print(f"Semana actual: {inicio_semana} a {fin_semana}")
print(f"               ({inicio_semana.strftime('%A')} a {fin_semana.strftime('%A')})\n")

# Obtener registros de la semana
registros = RegistroHabito.objects(
    habito=habito,
    fecha__gte=inicio_semana,
    fecha__lte=fin_semana
).order_by('fecha')

print(f"Total de registros en la semana: {registros.count()}\n")

# Mostrar cada registro
print(f"{'Fecha':<12} | {'Día':<10} | {'Estado':<10} | ID")
print("-" * 60)
for r in registros:
    estado_str = "✅ True" if r.estado else "❌ False"
    print(f"{r.fecha} | {r.fecha.strftime('%A'):<10} | {estado_str:<10} | {r.id}")

# Buscar duplicados
print(f"\n{'='*60}")
print("BÚSQUEDA DE DUPLICADOS:")
print(f"{'='*60}\n")

fechas_vistas = {}
duplicados_encontrados = False

for r in registros:
    fecha_str = str(r.fecha)
    if fecha_str in fechas_vistas:
        duplicados_encontrados = True
        print(f"⚠️  DUPLICADO en {r.fecha}:")
        print(f"   - Registro 1: ID={fechas_vistas[fecha_str]['id']}, Estado={fechas_vistas[fecha_str]['estado']}")
        print(f"   - Registro 2: ID={r.id}, Estado={r.estado}")
        print()
    else:
        fechas_vistas[fecha_str] = {'id': r.id, 'estado': r.estado}

if not duplicados_encontrados:
    print("✅ No se encontraron duplicados\n")

# Calcular progreso
completados = registros.filter(estado=True).count()
if habito.tipo_frecuencia and habito.tipo_frecuencia.lower() in ['diaria', 'diario']:
    total_esperado = 7
elif habito.tipo_frecuencia and habito.tipo_frecuencia.lower() == 'semanal':
    total_esperado = len(habito.dias) if habito.dias else 0
else:
    total_esperado = 0

progreso = (completados / total_esperado * 100) if total_esperado > 0 else 0

print(f"{'='*60}")
print("CÁLCULO DE PROGRESO:")
print(f"{'='*60}")
print(f"Completados: {completados}")
print(f"Total esperado: {total_esperado}")
print(f"Progreso: {progreso:.2f}%")
print(f"{'='*60}\n")
