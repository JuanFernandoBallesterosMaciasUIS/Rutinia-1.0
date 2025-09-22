package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import uis.edu.entorno.backend.modelo.Usuario;

//puente entre  objetos Java y la base de datos, permitiéndote realizar operaciones de CRUD
//sin necesidad de definir metodos

public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {

}
