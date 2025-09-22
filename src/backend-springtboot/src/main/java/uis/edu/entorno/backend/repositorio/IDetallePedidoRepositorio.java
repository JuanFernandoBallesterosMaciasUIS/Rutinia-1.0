package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import uis.edu.entorno.backend.modelo.DetallePedido;

public interface IDetallePedidoRepositorio extends JpaRepository<DetallePedido, Integer>{

}
