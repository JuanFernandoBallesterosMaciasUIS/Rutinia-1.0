package uis.edu.entorno.backend.servicio;

import uis.edu.entorno.backend.modelo.FrecuenciaHabito;
import java.util.List;

public interface IFrecuenciaHabitoService {
    
    List<FrecuenciaHabito> listarFrecuencias();
    FrecuenciaHabito buscarFrecuenciaPorId(Integer idFrecuencia);
    FrecuenciaHabito guardarFrecuencia(FrecuenciaHabito frecuencia);
    void eliminarFrecuencia(FrecuenciaHabito frecuencia);
    
}