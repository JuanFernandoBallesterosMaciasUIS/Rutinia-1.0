package uis.edu.entorno.backend.servicio;

import uis.edu.entorno.backend.modelo.UsuarioHabito;
import java.util.List;

public interface IUsuarioHabitoService {
    
    List<UsuarioHabito> listarUsuarioHabitos();
    UsuarioHabito buscarUsuarioHabitoPorId(Integer idUh);
    UsuarioHabito guardarUsuarioHabito(UsuarioHabito usuarioHabito);
    void eliminarUsuarioHabito(UsuarioHabito usuarioHabito);
    List<UsuarioHabito> buscarPorUsuario(Integer usuarioId);
    List<UsuarioHabito> buscarPorHabito(Integer habitoId);
    List<UsuarioHabito> buscarPorEstado(String estado);
    
}