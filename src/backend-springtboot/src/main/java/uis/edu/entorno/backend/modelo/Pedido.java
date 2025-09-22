package uis.edu.entorno.backend.modelo;

import java.time.LocalDate;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name=Pedido.TABLE_NAME)
public class Pedido {

	public static final String TABLE_NAME="pedido";
	
	//Atributos
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id_pedido;
	
	//foraneas
	
	@ManyToOne
	@JoinColumn(name="Id_usuario")
	private Usuario Id_usuario;
	
	
	private LocalDate Fecha;  //yyyy-MM-dd
	private float Total;
	private String Estado;
	private String Direccion;
	private String Tipo_pago;
	
	
	

	
	//contructor
	
	public Pedido() {
		
	}



	
	public Pedido(int id_pedido, LocalDate fecha, float total, String estado, String direccion, String tipo_pago,
			Usuario id_usuario) {
		super();
		Id_pedido = id_pedido;
		Fecha = fecha;
		Total = total;
		Estado = estado;
		Direccion = direccion;
		Tipo_pago = tipo_pago;
		Id_usuario = id_usuario;
	}




	//get y set

	public int getId_pedido() {
		return Id_pedido;
	}


	public void setId_pedido(int id_pedido) {
		Id_pedido = id_pedido;
	}


	public LocalDate getFecha() {
		return Fecha;
	}


	public void setFecha(LocalDate fecha) {
		Fecha = fecha;
	}


	public float getTotal() {
		return Total;
	}


	public void setTotal(float total) {
		Total = total;
	}


	public String getEstado() {
		return Estado;
	}


	public void setEstado(String estado) {
		Estado = estado;
	}


	public String getDireccion() {
		return Direccion;
	}


	public void setDireccion(String direccion) {
		Direccion = direccion;
	}


	public String getTipo_pago() {
		return Tipo_pago;
	}


	public void setTipo_pago(String tipo_pago) {
		Tipo_pago = tipo_pago;
	}




	public Usuario getId_usuario() {
		return Id_usuario;
	}




	public void setId_usuario(Usuario id_usuario) {
		Id_usuario = id_usuario;
	}
	
	
	
	
	
	
}
