package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uis.edu.entorno.backend.modelo.UsuarioHabito;
import java.util.List;

public interface IUsuarioHabitoRepositorio extends JpaRepository<UsuarioHabito, Integer> {
    
    // Buscar relaciones por usuario
    @Query("SELECT uh FROM UsuarioHabito uh WHERE uh.usuario.idUsuario = :usuarioId")
    List<UsuarioHabito> findByUsuarioId(@Param("usuarioId") Integer usuarioId);
    
    // Buscar relaciones por hábito
    @Query("SELECT uh FROM UsuarioHabito uh WHERE uh.habito.habitoId = :habitoId")
    List<UsuarioHabito> findByHabitoId(@Param("habitoId") Integer habitoId);
    
    // Buscar relaciones por estado
    @Query("SELECT uh FROM UsuarioHabito uh WHERE uh.estado = :estado")
    List<UsuarioHabito> findByEstado(@Param("estado") String estado);
    
}