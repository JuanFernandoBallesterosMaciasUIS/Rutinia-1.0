package uis.edu.entorno.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uis.edu.entorno.backend.modelo.FrecuenciaHabito;
import uis.edu.entorno.backend.repositorio.IFrecuenciaHabitoRepositorio;
import java.util.List;

@Service
public class FrecuenciaHabitoService implements IFrecuenciaHabitoService {
    
    @Autowired
    private IFrecuenciaHabitoRepositorio frecuenciaHabitoRepositorio;
    
    @Override
    public List<FrecuenciaHabito> listarFrecuencias() {
        return frecuenciaHabitoRepositorio.findAll();
    }
    
    @Override
    public FrecuenciaHabito buscarFrecuenciaPorId(Integer idFrecuencia) {
        return frecuenciaHabitoRepositorio.findById(idFrecuencia).orElse(null);
    }
    
    @Override
    public FrecuenciaHabito guardarFrecuencia(FrecuenciaHabito frecuencia) {
        return frecuenciaHabitoRepositorio.save(frecuencia);
    }
    
    @Override
    public void eliminarFrecuencia(FrecuenciaHabito frecuencia) {
        frecuenciaHabitoRepositorio.delete(frecuencia);
    }
    
}