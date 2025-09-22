package uis.edu.entorno.backend.servicio;

import java.util.List;

import uis.edu.entorno.backend.modelo.Producto;

public interface IProductoService {

	
	//listar todos los productos
	List<Producto> getProductos();
	
	//Buscar por ID
	Producto buscarProducto(int id);
	
	//Nuevo producto
	
	Producto nuevoProducto(Producto producto);
	
	//Borrar
	
	String eliminarProd(int id);
	
	
}
