-- Insertar roles básicos si no existen
INSERT INTO Rol (nombre_rol, descripcion) 
SELECT 'Usuario', 'Usuario estándar del sistema' 
WHERE NOT EXISTS (SELECT 1 FROM Rol WHERE nombre_rol = 'Usuario');

INSERT INTO Rol (nombre_rol, descripcion) 
SELECT 'Administrador', 'Administrador del sistema' 
WHERE NOT EXISTS (SELECT 1 FROM Rol WHERE nombre_rol = 'Administrador');