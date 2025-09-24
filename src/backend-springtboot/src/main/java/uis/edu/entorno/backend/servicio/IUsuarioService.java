package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.http.ResponseEntity;

import uis.edu.entorno.backend.modelo.LoginDto;
import uis.edu.entorno.backend.modelo.Usuario;

//definir los metodos, es buena la practica de interfaces
public interface IUsuarioService {

	
	//cabeceras de los metodos
	
	//listar usuarios
	
	List<Usuario> getUsuarios();
	
	//Nuevo usuario
	
	Usuario nuevoUsuario(Usuario usuario);
	
	//Buscar usuario
	
	Usuario buscarUsuario (int id);
	
	//eliminar usuario
	
	String borrarUsuario(int id);

	// Métodos para login
	int login(LoginDto usuarioDto);
	ResponseEntity<?> ingresar(LoginDto usuarioDto);
}
