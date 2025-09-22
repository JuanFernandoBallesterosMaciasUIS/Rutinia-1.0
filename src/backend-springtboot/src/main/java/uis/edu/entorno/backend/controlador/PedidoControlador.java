package uis.edu.entorno.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import uis.edu.entorno.backend.modelo.Pedido;
import uis.edu.entorno.backend.servicio.PedidoService;

@RestController
public class PedidoControlador {

	@Autowired
	PedidoService pedidoService;
	
	//listar pedidos
	@GetMapping("/pedidos")
	public List<Pedido> listarpedidos(){
		return pedidoService.getPedidos();
	}
	
	//Buscar por Id
	
	@GetMapping("/pedidos/{id}")
	public Pedido buscarId(@PathVariable int id){
		
		return pedidoService.buscarpedido(id);
		
	}
	
	//Actualiza pedido
	
	@PutMapping("/editarpedido")
	public ResponseEntity<Pedido> editarpedido(@RequestBody Pedido pedido){
		
		Pedido ped=null;
		
		ped=pedidoService.buscarpedido(pedido.getId_pedido());
		
		if (ped!=null) {
			
			ped.setDireccion(ped.getDireccion());
			ped.setEstado(ped.getEstado());
			ped.setFecha(ped.getFecha());
			ped.setTipo_pago(ped.getTipo_pago());
			ped.setTotal(ped.getTotal());	
			
		}else {
			return new ResponseEntity<> (ped,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(ped, HttpStatus.OK);
	}
	
	//nuevo pedido
	
	@PostMapping("/nuevopedido")
	public ResponseEntity<Pedido> nuevopedido(@RequestBody Pedido pedido){
		
		Pedido pedid=pedidoService.nuevopedido(pedido);
		
		return new ResponseEntity<>(pedid, HttpStatus.OK);
	}
}
