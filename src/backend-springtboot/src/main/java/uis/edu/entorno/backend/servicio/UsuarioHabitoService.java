package uis.edu.entorno.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uis.edu.entorno.backend.modelo.UsuarioHabito;
import uis.edu.entorno.backend.repositorio.IUsuarioHabitoRepositorio;
import java.util.List;

@Service
public class UsuarioHabitoService implements IUsuarioHabitoService {
    
    @Autowired
    private IUsuarioHabitoRepositorio usuarioHabitoRepositorio;
    
    @Override
    public List<UsuarioHabito> listarUsuarioHabitos() {
        return usuarioHabitoRepositorio.findAll();
    }
    
    @Override
    public UsuarioHabito buscarUsuarioHabitoPorId(Integer idUh) {
        return usuarioHabitoRepositorio.findById(idUh).orElse(null);
    }
    
    @Override
    public UsuarioHabito guardarUsuarioHabito(UsuarioHabito usuarioHabito) {
        return usuarioHabitoRepositorio.save(usuarioHabito);
    }
    
    @Override
    public void eliminarUsuarioHabito(UsuarioHabito usuarioHabito) {
        usuarioHabitoRepositorio.delete(usuarioHabito);
    }
    
    @Override
    public List<UsuarioHabito> buscarPorUsuario(Integer usuarioId) {
        return usuarioHabitoRepositorio.findByUsuarioId(usuarioId);
    }
    
    @Override
    public List<UsuarioHabito> buscarPorHabito(Integer habitoId) {
        return usuarioHabitoRepositorio.findByHabitoId(habitoId);
    }
    
    @Override
    public List<UsuarioHabito> buscarPorEstado(String estado) {
        return usuarioHabitoRepositorio.findByEstado(estado);
    }
    
}