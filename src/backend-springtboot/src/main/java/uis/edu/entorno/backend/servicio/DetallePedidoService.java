package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uis.edu.entorno.backend.modelo.DetallePedido;
import uis.edu.entorno.backend.repositorio.IDetallePedidoRepositorio;


@Service
@Transactional
public class DetallePedidoService implements IDetallePedidoService {
	
	@Autowired
	IDetallePedidoRepositorio detallePedidoRepositorio;
	

	@Override
	public List<DetallePedido> getDetallePedidos() {
		// listar detalles
		return detallePedidoRepositorio.findAll();
	}

	@Override
	public DetallePedido nuevoDetallePedido(DetallePedido detallePedido) {
		// crear detalle
		return detallePedidoRepositorio.save(detallePedido);
	}

	@Override
	public DetallePedido buscarDetallePedido(int id) {
		//buscar un detalle
		DetallePedido detallePedido = null;
		detallePedido = detallePedidoRepositorio.findById(id).orElse(null);
		if (detallePedido == null) {
			return null;
		}
		return detallePedido;
	}

	@Override
	public String borrarDetallePedido(int id) {
		//borrar detalle
		detallePedidoRepositorio.deleteById(id);
		return "Detalle pedido elimando correctamente";
	}
	
}
