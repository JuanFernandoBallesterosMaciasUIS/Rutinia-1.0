
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import uis.edu.entorno.backend.modelo.Producto;
import uis.edu.entorno.backend.servicio.ProductoService;

@RestController
public class ProductoControlador {

	@Autowired
	ProductoService productoService;
	
	//Listar productos
	
	@GetMapping("/productos")
	public List<Producto> cargarProductos(){
		return productoService.getProductos();
	}
	
	//Buscar por ID
	
	@GetMapping("/productos/{id}")
	public Producto buscarporID(@PathVariable int id) {
		
		return productoService.buscarProducto(id);
		
	}
	
	//crear nuevo producto
	@PostMapping("/nuevoproducto")
	public ResponseEntity<Producto> crearproducto(@RequestBody Producto producto) {
		
		Producto prod= productoService.nuevoProducto(producto);
		
		return new ResponseEntity<> (prod, HttpStatus.OK);
	}
	
	//Actualizar producto
	
	@PutMapping("/editarproducto")
	public ResponseEntity<Producto> editarproducto(@RequestBody Producto producto){
		
		Producto prod=productoService.buscarProducto(producto.getId_producto());
		
		if (prod!=null) {
			
			prod.setNombre(prod.getNombre());
			prod.setStock(prod.getStock());
			prod.setPrecio(prod.getPrecio());
			prod.setDescripcion(prod.getDescripcion());
			prod.setId_categoria(prod.getId_categoria());
			prod.setId_usuario(prod.getId_usuario());
			
			productoService.nuevoProducto(prod);
		}else {
			return new ResponseEntity<>(prod, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(prod, HttpStatus.OK);
		
	}
	
	
	
	//Eliminar producto
	@DeleteMapping("/borrarprod/{id}")
	public ResponseEntity<Producto> borrarproducto(@PathVariable int id){
		
		Producto prod=productoService.buscarProducto(id);
		
		if(prod!=null) {
			productoService.eliminarProd(id);
		}else {
			return new ResponseEntity<>(prod, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return null;
	}
	
}
