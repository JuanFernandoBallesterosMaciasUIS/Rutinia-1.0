package uis.edu.entorno.backend.servicio;

import uis.edu.entorno.backend.modelo.Recordatorio;
import java.util.List;

public interface IRecordatorioService {
    
    List<Recordatorio> listarRecordatorios();
    Recordatorio buscarRecordatorioPorId(Integer idRecordatorio);
    Recordatorio guardarRecordatorio(Recordatorio recordatorio);
    void eliminarRecordatorio(Recordatorio recordatorio);
    List<Recordatorio> buscarRecordatoriosPorHabito(Integer habitoId);
    
}