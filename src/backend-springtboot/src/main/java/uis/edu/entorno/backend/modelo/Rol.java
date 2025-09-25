package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "Rol")
public class Rol {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_rol")
	private Integer idRol;
	
	@Column(name = "nombre", length = 50)
	private String nombre;
	
	@Column(name = "descripcion", length = 100)
	private String descripcion;
	
	// Constructores
	public Rol() {}

	public Rol(String nombre, String descripcion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
	}

	// Getters y Setters
	public Integer getIdRol() {
		return idRol;
	}

	public void setIdRol(Integer idRol) {
		this.idRol = idRol;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	@Override
	public String toString() {
		return "Rol{" +
				"idRol=" + idRol +
				", nombre='" + nombre + '\'' +
				", descripcion='" + descripcion + '\'' +
				'}';
	}
}