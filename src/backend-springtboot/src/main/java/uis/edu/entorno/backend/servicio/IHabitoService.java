package uis.edu.entorno.backend.servicio;

import uis.edu.entorno.backend.modelo.Habito;
import java.util.List;

public interface IHabitoService {
    
    List<Habito> listarHabitos();
    Habito buscarHabitoPorId(Integer habitoId);
    Habito guardarHabito(Habito habito);
    void eliminarHabito(Habito habito);
    List<Habito> buscarHabitosPorUsuario(Integer usuarioId);
    List<Habito> buscarHabitosPorCategoria(Integer categoriaId);
    List<Habito> listarHabitosPublicos();
    
}