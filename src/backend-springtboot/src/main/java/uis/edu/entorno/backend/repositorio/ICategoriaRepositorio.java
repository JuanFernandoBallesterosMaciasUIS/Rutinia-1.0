package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import uis.edu.entorno.backend.modelo.Categoria;

public interface ICategoriaRepositorio extends JpaRepository<Categoria, Integer> {

}
