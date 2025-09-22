package uis.edu.entorno.backend.servicio;

import java.util.List;

import uis.edu.entorno.backend.modelo.Pedido;

public interface IPedidoService {

	
	//listar pedidos
	List<Pedido> getPedidos();
	
	//buscar pedido
	
	Pedido buscarpedido(int id);
	
	//nuevo pedido
	
	Pedido nuevopedido(Pedido pedido);
	
	
}
