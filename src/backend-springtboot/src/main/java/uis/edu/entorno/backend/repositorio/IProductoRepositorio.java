package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import uis.edu.entorno.backend.modelo.Producto;

public interface IProductoRepositorio extends JpaRepository<Producto, Integer>{

}
