package uis.edu.entorno.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uis.edu.entorno.backend.modelo.Rol;
import uis.edu.entorno.backend.repositorio.IRolRepositorio;


@Service
@Transactional
public class RolService implements IRolService {

	@Autowired
	IRolRepositorio rolRepositorio;
	
	
	@Override
	public List<Rol> getRoles() {
		// Lista todos los roles
		return rolRepositorio.findAll(); //método predefinido, para las consultas SQL(abreviatura)
	}
	
	
	@Override
	public Rol buscarRol(int id) {
			
		Rol rol=null;
		rol=rolRepositorio.findById(id).orElse(null);
		
		if (rol==null) {
			return null;
		}
		
		return rol;
	}


	@Override
	public Rol nuevoRol(Rol rol) {
		//nuevo rol
		return rolRepositorio.save(rol);
	}

}
