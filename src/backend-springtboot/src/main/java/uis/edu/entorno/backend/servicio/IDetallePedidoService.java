package uis.edu.entorno.backend.servicio;

import java.util.List;

import uis.edu.entorno.backend.modelo.DetallePedido;

public interface IDetallePedidoService {
	
	List<DetallePedido> getDetallePedidos();
	
	DetallePedido nuevoDetallePedido(DetallePedido detallePedido);
	
	DetallePedido buscarDetallePedido(int id);
	
	String borrarDetallePedido(int id);
	

}
