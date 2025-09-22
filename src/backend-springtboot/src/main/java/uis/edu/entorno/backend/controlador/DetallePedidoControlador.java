package uis.edu.entorno.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import uis.edu.entorno.backend.modelo.DetallePedido;
import uis.edu.entorno.backend.servicio.DetallePedidoService;


@RestController
@RequestMapping("/detalle")  //Todos los metodos inician por esta ruta
public class DetallePedidoControlador{

	@Autowired
	DetallePedidoService detallePedidoService;
	
	//listar detalles pedidos
	
	
	//todos los detalles
	@GetMapping("/listar")
	public List<DetallePedido> listarDetallePedidos() {
		// TODO Auto-generated method stub
		return detallePedidoService.getDetallePedidos();
	}

	//Detalles por id
	@GetMapping("/{id}")
	public DetallePedido buscarPorId(@PathVariable int id){
		return detallePedidoService.buscarDetallePedido(id);
		
	}
	
	//Agregar detallepedido
	@PostMapping("/nuevo")
	public ResponseEntity<DetallePedido> agregar(@RequestBody DetallePedido detallepedido){
		DetallePedido obj = detallePedidoService.nuevoDetallePedido(detallepedido);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
	
	//Editar detalles pedidos
	@PutMapping("/actualizar")
	public ResponseEntity<DetallePedido> editar(@RequestBody DetallePedido detallePedido){
		DetallePedido obj = detallePedidoService.buscarDetallePedido(detallePedido.getId_detalle_pedido());
		
		if (obj != null) {
			obj.setPedido(detallePedido.getPedido());
			obj.setProducto(detallePedido.getProducto());
			obj.setCantidad(detallePedido.getCantidad());
			obj.setPrecioUnitaro(detallePedido.getPrecioUnitaro());
			
			detallePedidoService.nuevoDetallePedido(obj);
		} else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
	
	//Eliminar detallepedido
	@DeleteMapping("/borrar/{id}")
	public ResponseEntity<DetallePedido> eliminar(@PathVariable int id){
		DetallePedido obj = detallePedidoService.buscarDetallePedido(id);
		if (obj != null) {
			detallePedidoService.borrarDetallePedido(id);
			return new ResponseEntity<>(obj, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
