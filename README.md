# 🗓️ Rutinia

Aplicación web para la gestión de hábitos, diseñada para ayudar a los usuarios a crear, organizar y visualizar sus rutinas de forma intuitiva mediante calendarios, reportes y recordatorios.

👉 La documentación completa del proyecto está disponible en la [Wiki](https://github.com/JuanFernandoBallesterosMaciasUIS/Rutinia-1.0/wiki). 

---

## ✨ Características

- ✅ Crear y gestionar hábitos personalizados.  
- 📅 Seleccionar frecuencia (diaria, semanal, mensual).  
- 🔔 Recordatorios automáticos o manuales.  
- 📊 Reportes semanales y mensuales.  
- 📆 Visualización con calendarios y gráficos interactivos.  
- 👤 Perfil de usuario con estadísticas de progreso.  

---

## 🛠️ Tecnologías utilizadas

- **Backend:** Spring Boot (Java) futura implementación con Django (Python)  
- **Frontend:** HTML, CSS, JavaScript (posiblemente React en versiones futuras)  
- **Base de datos:** MySQL  
- **Control de versiones:** Git y GitHub  
- **Metodología:** SCRUM  

---

## 📂 Estructura del proyecto

```
habit-tracker/
├── src/              # Todo el código fuente aquí
│   ├── backend/      # API, lógica, base de datos
│   └── frontend/     # Interfaz de usuario
│── docs/             # Documentación y diagramas             
│   ├── arquitectura/ # Diagramas de arquitectura, modelos UML, etc.
│   ├── diseno-ui/    # Mockups, wireframes, bocetos
│── tests/            # Pruebas unitarias
├── sprints/
│   ├── sprint-01/
│   └── sprint-02/
│── README.md
```
---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para colaborar:

1. Haz un fork del proyecto.

2. Crea una rama con tu mejora (git checkout -b feature/nueva-funcionalidad).

3. Haz commit de tus cambios (git commit -m 'tipo: verbo infinitivo + descripcion corta').

4. Haz push a tu rama (git push origin feature/nueva-funcionalidad).

5. Abre un Pull Request.

> Se recomienda leer la [wiki](https://github.com/JuanFernandoBallesterosMaciasUIS/Rutinia-1.0/wiki) del proyecto, especialmente la sección de como colaborar
---

## ⚙️ Instalación y configuración

1. Clonar el repositorio:
   
   ```bash
   git clone https://github.com/JuanFernandoBallesterosMaciasUIS/Rutinia-1.0.git
   cd Rutinia-1.0
   ```
   
3. Ejecutar proyecto
   
   Si se hace uso de IDEs como visual estudio code ejecutar el siguiente comando
   ```bash
   ./mvnw spring-boot:run
   ```
   > Se recomienda el uso de eclipse para la ejecución de este proyecto
   
5. Acceder a APIs RESTful
   
   Una vez con el proyecto en ejecución se puede acceder a la siguiente url
   ```bash
   http://localhost:8080/swagger-ui/index.html
   ```
   

## 👨‍💻 Autores
- [Helbert Alexeiv Correa Uribe](https://github.com/Alvoid101) – Product Owner and development team
 
- [Juan Fernando Ballesteros Macias](https://github.com/JuanFernandoBallesterosMaciasUIS) – Scrum master and Development Team

- Camilo Ivan Palacio Perez – Development Team

- [Julian Javier Lizcano Villarreal](https://github.com/jjlizcano) – Scrum máster y development team

- Carlos Eduardo Ayala Moreno – Product owner y development team

- Harold Esteban Duran Osma – Development Team

## Diseño de base de datos relacional
![Modelo entidad relación](docs/arquitectura/Modelo-Entidad-Relacion/MER_Extendido.jpg)
