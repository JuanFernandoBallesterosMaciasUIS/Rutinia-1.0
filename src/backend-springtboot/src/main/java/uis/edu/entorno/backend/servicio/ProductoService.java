package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uis.edu.entorno.backend.modelo.Producto;
import uis.edu.entorno.backend.repositorio.IProductoRepositorio;

@Service
@Transactional
public class ProductoService implements IProductoService{

	@Autowired
	IProductoRepositorio productoRepositorio;

	@Override
	public List<Producto> getProductos() {
		// Lista productos
		return productoRepositorio.findAll();
	}

	@Override
	public Producto buscarProducto(int id) {
		// Producto por id
		
		Producto producto=null;
		
		producto=productoRepositorio.findById(id).orElse(null);
		
		if(producto==null) {
			return null;
		}
		return producto;
		
	}

	@Override
	public Producto nuevoProducto(Producto producto) {
		// Nuevo producto
		return productoRepositorio.save(producto);
	}

	
	//Esto solo se puede si nadie lo ha pedido
	@Override
	public String eliminarProd(int id) {
		// Borrar producto
		productoRepositorio.deleteById(id);
		return "Producto eliminado exitosamente";
	}
	
	
	
}
