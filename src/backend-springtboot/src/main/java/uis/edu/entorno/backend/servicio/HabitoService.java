package uis.edu.entorno.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uis.edu.entorno.backend.modelo.Habito;
import uis.edu.entorno.backend.repositorio.IHabitoRepositorio;
import java.util.List;

@Service
public class HabitoService implements IHabitoService {
    
    @Autowired
    private IHabitoRepositorio habitoRepositorio;
    
    @Override
    public List<Habito> listarHabitos() {
        return habitoRepositorio.findAll();
    }
    
    @Override
    public Habito buscarHabitoPorId(Integer habitoId) {
        return habitoRepositorio.findById(habitoId).orElse(null);
    }
    
    @Override
    public Habito guardarHabito(Habito habito) {
        return habitoRepositorio.save(habito);
    }
    
    @Override
    public void eliminarHabito(Habito habito) {
        habitoRepositorio.delete(habito);
    }
    
    @Override
    public List<Habito> buscarHabitosPorUsuario(Integer usuarioId) {
        return habitoRepositorio.findByUsuarioId(usuarioId);
    }
    
    @Override
    public List<Habito> buscarHabitosPorCategoria(Integer categoriaId) {
        return habitoRepositorio.findByCategoriaId(categoriaId);
    }
    
    @Override
    public List<Habito> listarHabitosPublicos() {
        return habitoRepositorio.findPublicHabitos();
    }
    
}