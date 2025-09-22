package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uis.edu.entorno.backend.repositorio.IUsuarioRepositorio;
import uis.edu.entorno.backend.modelo.Usuario;


//intermediario entre el controlador y repositorio


@Service //denota que esta clase es de servicio
@Transactional //permite la transaccion a la BD de forma segura
//implementa la interface IUsuari... 
public class UsuarioService implements IUsuarioService {

	@Autowired //me permite conectar directamente otros componente(dependencias)
	IUsuarioRepositorio usuarioRepositorio;
	
	//Utiliza los metodos creados en la interface
	@Override
	public List<Usuario> getUsuarios() {
		// Lista todos los usuarios
		return usuarioRepositorio.findAll(); //método predefinido, para las consultas SQL(abreviatura)
	}

	@Override
	public Usuario nuevoUsuario(Usuario usuario) {
		// Grabar los datos del usuario
		return usuarioRepositorio.save(usuario);
	}

	@Override
	public Usuario buscarUsuario(int id) {
		// Buscar usuario
		
		Usuario usuario=null;
		
		usuario=usuarioRepositorio.findById(id).orElse(null);
		
		if (usuario==null) {
			return null;
			
		}
		return usuario ;
	}

	@Override
	public String borrarUsuario(int id) {
		// Borrar usuario
		
		usuarioRepositorio.deleteById(id);
		return "Usuario eliminado exitosamente";
	}
	
}
