package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import uis.edu.entorno.backend.modelo.Pedido;

public interface IPedidoRepositorio extends JpaRepository<Pedido, Integer> {

}
