package uis.edu.entorno.backend.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name= DetallePedido.TABLE_NAME)
public class DetallePedido {
	
	public static final String TABLE_NAME="detalle_pedido";
	
	//Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id_detalle_pedido;
	
	@ManyToOne
	@JoinColumn(name="id_pedido", nullable = false)
	private Pedido pedido;
	
	@ManyToOne
	@JoinColumn(name="id_producto", nullable = false)
	private Producto producto;
	
	private int cantidad;
	private float precioUnitaro;
	
	//Constructores
	public DetallePedido() {
	}

	public DetallePedido(int id_detalle_pedido, Pedido pedido, Producto producto, int cantidad, float precioUnitaro) {
		super();
		Id_detalle_pedido = id_detalle_pedido;
		this.pedido = pedido;
		this.producto = producto;
		this.cantidad = cantidad;
		this.precioUnitaro = precioUnitaro;
	}

	//GETS AND SETS
	public int getId_detalle_pedido() {
		return Id_detalle_pedido;
	}

	public void setId_detalle_pedido(int id_detalle_pedido) {
		Id_detalle_pedido = id_detalle_pedido;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public float getPrecioUnitaro() {
		return precioUnitaro;
	}

	public void setPrecioUnitaro(float precioUnitaro) {
		this.precioUnitaro = precioUnitaro;
	}
	
	
	
}
