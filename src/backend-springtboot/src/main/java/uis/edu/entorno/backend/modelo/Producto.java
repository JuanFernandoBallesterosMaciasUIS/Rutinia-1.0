package uis.edu.entorno.backend.modelo;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name=Producto.TABLE_NAME)

public class Producto {
	
	public static final String TABLE_NAME="producto";

	
	//atributos
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id_producto;
	
	private String Nombre;
	private int Stock;
	private float Precio;
	private String Descripcion;
	private String Imagen;
	
	
	//foraneas
	@ManyToOne
	@JoinColumn(name="Id_categoria")
	private Categoria Id_categoria;
	
	@ManyToOne
	@JoinColumn(name="Id_usuario")
	private Usuario Id_usuario;
	
	
	//Contructors
	
	public Producto() {

	}
	
	public Producto(int id_producto, String nombre, int stock, float precio, String descripcion, String imagen,
			Categoria id_categoria, Usuario id_usuario) {
		super();
		Id_producto = id_producto;
		Nombre = nombre;
		Stock = stock;
		Precio = precio;
		Descripcion = descripcion;
		Imagen = imagen;
		Id_categoria = id_categoria;
		Id_usuario = id_usuario;
	}
	
	//get y set

	public int getId_producto() {
		return Id_producto;
	}

	public void setId_producto(int id_producto) {
		Id_producto = id_producto;
	}

	public String getNombre() {
		return Nombre;
	}

	public void setNombre(String nombre) {
		Nombre = nombre;
	}

	public int getStock() {
		return Stock;
	}

	public void setStock(int stock) {
		Stock = stock;
	}

	public float getPrecio() {
		return Precio;
	}

	public void setPrecio(float precio) {
		Precio = precio;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}

	public String getImagen() {
		return Imagen;
	}

	public void setImagen(String imagen) {
		Imagen = imagen;
	}

	public Categoria getId_categoria() {
		return Id_categoria;
	}

	public void setId_categoria(Categoria id_categoria) {
		Id_categoria = id_categoria;
	}

	public Usuario getId_usuario() {
		return Id_usuario;
	}

	public void setId_usuario(Usuario id_usuario) {
		Id_usuario = id_usuario;
	}




	
	
}
