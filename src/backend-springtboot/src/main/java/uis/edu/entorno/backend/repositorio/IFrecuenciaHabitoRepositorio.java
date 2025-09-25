package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import uis.edu.entorno.backend.modelo.FrecuenciaHabito;

public interface IFrecuenciaHabitoRepositorio extends JpaRepository<FrecuenciaHabito, Integer> {
    
}