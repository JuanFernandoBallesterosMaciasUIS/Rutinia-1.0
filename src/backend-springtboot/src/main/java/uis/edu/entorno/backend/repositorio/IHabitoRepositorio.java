package uis.edu.entorno.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uis.edu.entorno.backend.modelo.Habito;
import java.util.List;

public interface IHabitoRepositorio extends JpaRepository<Habito, Integer> {
    
    // Buscar hábitos por usuario
    @Query("SELECT h FROM Habito h WHERE h.usuario.idUsuario = :usuarioId")
    List<Habito> findByUsuarioId(@Param("usuarioId") Integer usuarioId);
    
    // Buscar hábitos por categoría
    @Query("SELECT h FROM Habito h WHERE h.categoria.idCategoria = :categoriaId")
    List<Habito> findByCategoriaId(@Param("categoriaId") Integer categoriaId);
    
    // Buscar hábitos públicos
    @Query("SELECT h FROM Habito h WHERE h.publico = true")
    List<Habito> findPublicHabitos();
    
}