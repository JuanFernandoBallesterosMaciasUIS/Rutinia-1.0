package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Integer idUsuario;
	
	@ManyToOne
	@JoinColumn(name = "id_rol", referencedColumnName = "id_rol")
	private Rol rol;
	
	@Column(name = "nombre", length = 50)
	private String nombre;
	
	@Column(name = "apellido", length = 50)
	private String apellido;
	
	@Column(name = "correo", length = 100)
	private String correo;
	
	@Column(name = "clave", length = 100)
	private String clave;
	
	@Column(name = "tema", length = 20)
	private String tema;
	
	@Column(name = "notificaciones")
	private Boolean notificaciones;
	
	// Constructores
	public Usuario() {}

	public Usuario(Rol rol, String nombre, String apellido, String correo, String clave, 
			String tema, Boolean notificaciones) {
		this.rol = rol;
		this.nombre = nombre;
		this.apellido = apellido;
		this.correo = correo;
		this.clave = clave;
		this.tema = tema;
		this.notificaciones = notificaciones;
	}

	// Getters y Setters
	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public String getTema() {
		return tema;
	}

	public void setTema(String tema) {
		this.tema = tema;
	}

	public Boolean getNotificaciones() {
		return notificaciones;
	}

	public void setNotificaciones(Boolean notificaciones) {
		this.notificaciones = notificaciones;
	}

	@Override
	public String toString() {
		return "Usuario{" +
				"idUsuario=" + idUsuario +
				", nombre='" + nombre + '\'' +
				", apellido='" + apellido + '\'' +
				", correo='" + correo + '\'' +
				", tema='" + tema + '\'' +
				", notificaciones=" + notificaciones +
				'}';
	}
}