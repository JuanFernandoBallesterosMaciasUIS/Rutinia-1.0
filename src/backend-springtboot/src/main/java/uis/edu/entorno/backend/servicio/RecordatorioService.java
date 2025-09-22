package uis.edu.entorno.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uis.edu.entorno.backend.modelo.Recordatorio;
import uis.edu.entorno.backend.repositorio.IRecordatorioRepositorio;
import java.util.List;

@Service
public class RecordatorioService implements IRecordatorioService {
    
    @Autowired
    private IRecordatorioRepositorio recordatorioRepositorio;
    
    @Override
    public List<Recordatorio> listarRecordatorios() {
        return recordatorioRepositorio.findAll();
    }
    
    @Override
    public Recordatorio buscarRecordatorioPorId(Integer idRecordatorio) {
        return recordatorioRepositorio.findById(idRecordatorio).orElse(null);
    }
    
    @Override
    public Recordatorio guardarRecordatorio(Recordatorio recordatorio) {
        return recordatorioRepositorio.save(recordatorio);
    }
    
    @Override
    public void eliminarRecordatorio(Recordatorio recordatorio) {
        recordatorioRepositorio.delete(recordatorio);
    }
    
    @Override
    public List<Recordatorio> buscarRecordatoriosPorHabito(Integer habitoId) {
        return recordatorioRepositorio.findByHabitoId(habitoId);
    }
    
}