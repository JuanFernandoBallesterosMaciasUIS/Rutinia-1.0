package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uis.edu.entorno.backend.modelo.Recordatorio;
import java.util.List;

public interface IRecordatorioRepositorio extends JpaRepository<Recordatorio, Integer> {
    
    // Buscar recordatorios por hábito
    @Query("SELECT r FROM Recordatorio r WHERE r.habito.habitoId = :habitoId")
    List<Recordatorio> findByHabitoId(@Param("habitoId") Integer habitoId);
    
}