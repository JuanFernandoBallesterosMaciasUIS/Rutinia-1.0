package uis.edu.entorno.backend.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uis.edu.entorno.backend.modelo.FrecuenciaHabito;
import uis.edu.entorno.backend.servicio.IFrecuenciaHabitoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/frecuencias")
@CrossOrigin(value = "http://localhost:3000")
public class FrecuenciaHabitoControlador {
    
    private static final Logger logger = LoggerFactory.getLogger(FrecuenciaHabitoControlador.class);
    
    @Autowired
    private IFrecuenciaHabitoService frecuenciaHabitoService;
    
    @GetMapping("/list")
    public List<FrecuenciaHabito> obtenerFrecuencias() {
        var frecuencias = frecuenciaHabitoService.listarFrecuencias();
        frecuencias.forEach((frecuencia -> logger.info(frecuencia.toString())));
        return frecuencias;
    }
    
    @PostMapping("/")
    public FrecuenciaHabito agregarFrecuencia(@RequestBody FrecuenciaHabito frecuencia) {
        logger.info("Frecuencia a agregar: " + frecuencia);
        return frecuenciaHabitoService.guardarFrecuencia(frecuencia);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FrecuenciaHabito> obtenerFrecuenciaPorId(@PathVariable Integer id) {
        FrecuenciaHabito frecuencia = frecuenciaHabitoService.buscarFrecuenciaPorId(id);
        if (frecuencia == null) {
            throw new RuntimeException("No se encontró la frecuencia con id: " + id);
        }
        return ResponseEntity.ok(frecuencia);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<FrecuenciaHabito> actualizarFrecuencia(@PathVariable Integer id, @RequestBody FrecuenciaHabito frecuenciaRecibida) {
        FrecuenciaHabito frecuencia = frecuenciaHabitoService.buscarFrecuenciaPorId(id);
        if (frecuencia == null) {
            throw new RuntimeException("No se encontró la frecuencia con id: " + id);
        }
        
        frecuencia.setTipo(frecuenciaRecibida.getTipo());
        frecuencia.setVeces(frecuenciaRecibida.getVeces());
        
        frecuenciaHabitoService.guardarFrecuencia(frecuencia);
        return ResponseEntity.ok(frecuencia);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarFrecuencia(@PathVariable Integer id) {
        FrecuenciaHabito frecuencia = frecuenciaHabitoService.buscarFrecuenciaPorId(id);
        if (frecuencia == null) {
            throw new RuntimeException("No se encontró la frecuencia con id: " + id);
        }
        
        frecuenciaHabitoService.eliminarFrecuencia(frecuencia);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}