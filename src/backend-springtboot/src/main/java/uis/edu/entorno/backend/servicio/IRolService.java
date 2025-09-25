package uis.edu.entorno.backend.servicio;

import java.util.List;

import uis.edu.entorno.backend.modelo.Rol;


public interface IRolService {

	//listar los roles
	
	List<Rol> getRoles();
	
	//Buscar Rol
	
	Rol buscarRol (int id);
	
	//nuevo rol
	Rol nuevoRol(Rol rol);
	
	
	
	
}
