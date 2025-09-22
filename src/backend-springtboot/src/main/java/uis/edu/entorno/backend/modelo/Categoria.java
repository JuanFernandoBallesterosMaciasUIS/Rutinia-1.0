package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "Categoria")
public class Categoria {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_categoria")
	private Integer idCategoria;
	
	@Column(name = "nombre", length = 50)
	private String nombre;
	
	// Constructores
	public Categoria() {}

	public Categoria(String nombre) {
		this.nombre = nombre;
	}

	// Getters y Setters
	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Categoria{" +
				"idCategoria=" + idCategoria +
				", nombre='" + nombre + '\'' +
				'}';
	}
}