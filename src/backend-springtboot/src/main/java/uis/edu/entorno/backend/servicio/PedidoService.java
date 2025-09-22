package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uis.edu.entorno.backend.modelo.Pedido;
import uis.edu.entorno.backend.repositorio.IPedidoRepositorio;


@Service
@Transactional
public class PedidoService implements IPedidoService {

	@Autowired
	
	IPedidoRepositorio pedidoRepositorio;
	
	@Override
	public List<Pedido> getPedidos() {
		//listar pedidos
		return pedidoRepositorio.findAll();
	}

	@Override
	public Pedido buscarpedido(int id) {
		//Buscar por ID
		Pedido ped= pedidoRepositorio.findById(id).orElse(null);
		if (ped==null) {
			return null;
			
		}
		return ped;
			
	}

	@Override
	public Pedido nuevopedido(Pedido pedido) {
		//nuevo pedido
		return pedidoRepositorio.save(pedido);
	}

}
