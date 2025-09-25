package uis.edu.entorno.backend.servicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uis.edu.entorno.backend.modelo.LoginDto;
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

	@Override
	public int login(LoginDto usuarioDto) {
		int u = usuarioRepositorio.findByNombreUsuarioAndPassword(usuarioDto.getNombreUsuario(), usuarioDto.getPassword());
		return u;
	}

	@Override
	public ResponseEntity<?> ingresar(LoginDto usuarioDto) {
		Map<String, Object> response = new HashMap<>();
		Usuario usuario = null;
		try {
			usuario = usuarioRepositorio.findByNameAndPassword(usuarioDto.getNombreUsuario(), usuarioDto.getPassword());

			if (usuario == null) {
				response.put("Usuario", null);
				response.put("Mensaje", "Alerta: Usuario o Password incorrectos");
				response.put("statusCode", HttpStatus.NOT_FOUND.value());
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			} else {
				response.put("Usuario", usuario);
				response.put("Mensaje", "Datos correctos");
				response.put("statusCode", HttpStatus.OK.value());
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			response.put("Usuario", null);
			response.put("Mensaje", "Ha ocurrido un error");
			response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
