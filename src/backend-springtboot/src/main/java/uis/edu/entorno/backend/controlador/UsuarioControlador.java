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


import uis.edu.entorno.backend.servicio.UsuarioService;
import uis.edu.entorno.backend.modelo.LoginDto;
import uis.edu.entorno.backend.modelo.Usuario;

@RestController //especifica que esta clase esta diseñada para manejar solicitudes web y devolver datos
public class UsuarioControlador {
	
	//atributos
	@Autowired//conectar automáticamente los componentes 
	//utilizamos los metodos de la clase
	UsuarioService usuarioService;
	
	//Listar usuarios
	@GetMapping("/api/usuarios/list")//Le dice al servidor que este método debe manejar 
	//las solicitudes HTTP de tipo GET
	public List<Usuario> cargarUsuario(){
		return usuarioService.getUsuarios();
	}
	
	//Buscar por ID
	
	@GetMapping("/api/usuarios/list/{id}")
	public Usuario buscarPorId (@PathVariable int id) {
		
		return usuarioService.buscarUsuario(id);
	}
	
	//agregar un usuario
	@PostMapping("/api/usuarios/")
	
	public ResponseEntity<Usuario> agregar(@RequestBody Usuario usuario){
		Usuario obj =usuarioService.nuevoUsuario(usuario);
		//retorna un objeto en formato JSON  eso significa ResponseEntity (control Http)
		return new ResponseEntity<> (obj, HttpStatus.OK);
		
	}
	
	//editar usuario
	
	@PutMapping("/api/usuarios/")
	//Es el tipo de dato que el método devolverá //con el formato JSON  de entrada se crea el objeto
	public ResponseEntity<Usuario> editar(@RequestBody Usuario usuario){
		Usuario obj =usuarioService.buscarUsuario(usuario.getIdUsuario());
		
		if (obj!=null) {
			//get obtiene los valores del JSOn ingresado
			//set reestablece, cambia el valor actual
			obj.setCorreo(usuario.getCorreo());
			obj.setNombre(usuario.getNombre());
			obj.setApellido(usuario.getApellido());
			obj.setClave(usuario.getClave());
			obj.setRol(usuario.getRol());
			obj.setTema(usuario.getTema());
			obj.setNotificaciones(usuario.getNotificaciones());

			
			usuarioService.nuevoUsuario(obj);
		}else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<> (obj, HttpStatus.OK);
		
	}	
	
	//eliminar usuario
	
	@DeleteMapping("/api/usuarios/{id}")
	public ResponseEntity<Usuario> eliminar(@PathVariable int id){
		Usuario obj =usuarioService.buscarUsuario(id);
		
		if (obj!=null) {
			usuarioService.borrarUsuario(id);
		}else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return null;
	}

	@PostMapping("/loginclient")
	public int login(@RequestBody LoginDto usuario) {
		return usuarioService.login(usuario);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginCliente(@RequestBody LoginDto usuario) {
		return usuarioService.ingresar(usuario);
	}

	@PostMapping("/registro")
	public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario){
		Usuario obj = usuarioService.nuevoUsuario(usuario);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
}
