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

import uis.edu.entorno.backend.modelo.Rol;
import uis.edu.entorno.backend.servicio.RolService;

@RestController
public class RolControlador {

	//Atributos
	
	@Autowired
	RolService rolService;
	
	//Listar los roles
	
	@GetMapping("/api/roles/list")
	public List<Rol> cargarRol(){
		return rolService.getRoles();
	}
	
	//Buscar al rol por ID
	
	@GetMapping("/api/roles/list/{id}")
	public Rol buscarId (@PathVariable int id) {
		
		return rolService.buscarRol(id);
	}
	
	//nuevo rol
	@PostMapping("/api/roles/")
	
	public ResponseEntity<Rol> crearrol(@RequestBody Rol rol) {
		
		Rol rol1= rolService.nuevoRol(rol);
		
		return new ResponseEntity<> (rol1, HttpStatus.OK);
	}
	
	//editar rol
	@PutMapping("/api/roles/")
	//Es el tipo de dato que el método devolverá //con el formato JSON  de entrada se crea el objeto
	public ResponseEntity<Rol> editar(@RequestBody Rol rol){
		Rol obj =rolService.buscarRol(rol.getIdRol());
		
		if (obj!=null) {
			//get obtiene los valores del JSón ingresado
			//set reestablece, cambia el valor actual
		
			obj.setNombre(rol.getNombre());
			obj.setDescripcion(rol.getDescripcion());
			
			rolService.nuevoRol(obj);
		}else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<> (obj, HttpStatus.OK);
		
	}	
	
}
