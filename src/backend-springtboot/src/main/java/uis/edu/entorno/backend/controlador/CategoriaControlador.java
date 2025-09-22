package uis.edu.entorno.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import uis.edu.entorno.backend.modelo.Categoria;
import uis.edu.entorno.backend.servicio.CategoriaService;


@RestController
public class CategoriaControlador {

	@Autowired
	CategoriaService categoriaService;
	
	//Listar categorias
	@GetMapping("/categorias")
	public List<Categoria> cargarcategorias(){
		return categoriaService.getCategorias();
	}
	
	//Buscar por ID
	
	@GetMapping("categorias/{id}")
	public Categoria buscarporId(@PathVariable int id) {
		
		return categoriaService.buscarCategoria(id);
	}
	
	//nueva categoria
	@PostMapping("/nuevacategoria")
	public ResponseEntity<Categoria> nuevaCateg(@RequestBody Categoria categoria) {
		
		Categoria cat=categoriaService.nuevaCategoria(categoria);
		
		return new ResponseEntity<> (cat, HttpStatus.OK);
	}
	
	//editar categoria
	@PutMapping("/actualizarcateg")
	//Es el tipo de dato que el método devolverá //con el formato JSON  de entrada se crea el objeto
	public ResponseEntity<Categoria> editar(@RequestBody Categoria categoria){
		Categoria obj =categoriaService.buscarCategoria(categoria.getIdCategoria());
		
		if (obj!=null) {
			//get obtiene los valores del JSón ingresado
			//set reestablece, cambia el valor actual
		
			obj.setNombre(categoria.getNombre());


			
			categoriaService.nuevaCategoria(obj);
		}else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<> (obj, HttpStatus.OK);
		
	}	
}
