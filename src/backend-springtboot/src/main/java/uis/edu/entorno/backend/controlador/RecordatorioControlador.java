package uis.edu.entorno.backend.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uis.edu.entorno.backend.modelo.Recordatorio;
import uis.edu.entorno.backend.servicio.IRecordatorioService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recordatorios")
@CrossOrigin(value = "http://localhost:3000")
public class RecordatorioControlador {
    
    private static final Logger logger = LoggerFactory.getLogger(RecordatorioControlador.class);
    
    @Autowired
    private IRecordatorioService recordatorioService;
    
    @GetMapping("/list")
    public List<Recordatorio> obtenerRecordatorios() {
        var recordatorios = recordatorioService.listarRecordatorios();
        recordatorios.forEach((recordatorio -> logger.info(recordatorio.toString())));
        return recordatorios;
    }
    
    @PostMapping("/")
    public Recordatorio agregarRecordatorio(@RequestBody Recordatorio recordatorio) {
        logger.info("Recordatorio a agregar: " + recordatorio);
        return recordatorioService.guardarRecordatorio(recordatorio);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Recordatorio> obtenerRecordatorioPorId(@PathVariable Integer id) {
        Recordatorio recordatorio = recordatorioService.buscarRecordatorioPorId(id);
        if (recordatorio == null) {
            throw new RuntimeException("No se encontró el recordatorio con id: " + id);
        }
        return ResponseEntity.ok(recordatorio);
    }
    
    @GetMapping("/habito/{habitoId}")
    public List<Recordatorio> obtenerRecordatoriosPorHabito(@PathVariable Integer habitoId) {
        return recordatorioService.buscarRecordatoriosPorHabito(habitoId);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Recordatorio> actualizarRecordatorio(@PathVariable Integer id, @RequestBody Recordatorio recordatorioRecibido) {
        Recordatorio recordatorio = recordatorioService.buscarRecordatorioPorId(id);
        if (recordatorio == null) {
            throw new RuntimeException("No se encontró el recordatorio con id: " + id);
        }
        
        recordatorio.setHora(recordatorioRecibido.getHora());
        recordatorio.setTipoRepeticion(recordatorioRecibido.getTipoRepeticion());
        recordatorio.setIntervalo(recordatorioRecibido.getIntervalo());
        recordatorio.setDiasSemana(recordatorioRecibido.getDiasSemana());
        recordatorio.setVeces(recordatorioRecibido.getVeces());
        recordatorio.setHabito(recordatorioRecibido.getHabito());
        
        recordatorioService.guardarRecordatorio(recordatorio);
        return ResponseEntity.ok(recordatorio);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarRecordatorio(@PathVariable Integer id) {
        Recordatorio recordatorio = recordatorioService.buscarRecordatorioPorId(id);
        if (recordatorio == null) {
            throw new RuntimeException("No se encontró el recordatorio con id: " + id);
        }
        
        recordatorioService.eliminarRecordatorio(recordatorio);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}