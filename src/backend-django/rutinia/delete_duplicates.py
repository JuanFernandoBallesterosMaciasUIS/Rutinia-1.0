#!/usr/bin/env python
"""Script para eliminar registros duplicados"""
import os
import sys
import django
from datetime import date

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rutinia.settings')
django.setup()

from core.models import RegistroHabito

print("Buscando y eliminando registros duplicados...\n")

# Obtener todos los registros
todos_registros = RegistroHabito.objects.all()

# Agrupar por hábito + fecha
registros_por_dia = {}
duplicados = []

for registro in todos_registros:
    key = f"{registro.habito.id}_{registro.fecha}"
    
    if key not in registros_por_dia:
        registros_por_dia[key] = []
    
    registros_por_dia[key].append(registro)

# Encontrar duplicados
for key, registros in registros_por_dia.items():
    if len(registros) > 1:
        # Ordenar por ID (mantener el primero)
        registros_ordenados = sorted(registros, key=lambda r: str(r.id))
        
        # Mantener el primero, eliminar el resto
        mantener = registros_ordenados[0]
        eliminar = registros_ordenados[1:]
        
        print(f"📅 Fecha: {mantener.fecha} | Hábito: {mantener.habito.nombre}")
        print(f"   ✅ Mantener: ID={mantener.id} | Estado={mantener.estado}")
        
        for reg in eliminar:
            print(f"   ❌ Eliminar: ID={reg.id} | Estado={reg.estado}")
            reg.delete()
            duplicados.append(reg)
        
        print()

print(f"\n{'='*60}")
print(f"Total de registros duplicados eliminados: {len(duplicados)}")
print(f"{'='*60}\n")
