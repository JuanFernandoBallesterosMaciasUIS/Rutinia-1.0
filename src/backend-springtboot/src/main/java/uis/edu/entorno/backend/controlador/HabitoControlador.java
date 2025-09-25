package uis.edu.entorno.backend.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uis.edu.entorno.backend.modelo.Habito;
import uis.edu.entorno.backend.servicio.IHabitoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/habitos")
@CrossOrigin(value = "http://localhost:3000")
public class HabitoControlador {
    
    private static final Logger logger = LoggerFactory.getLogger(HabitoControlador.class);
    
    @Autowired
    private IHabitoService habitoService;
    
    @GetMapping("/list")
    public List<Habito> obtenerHabitos() {
        var habitos = habitoService.listarHabitos();
        habitos.forEach((habito -> logger.info(habito.toString())));
        return habitos;
    }
    
    @PostMapping("/")
    public Habito agregarHabito(@RequestBody Habito habito) {
        logger.info("Hábito a agregar: " + habito);
        return habitoService.guardarHabito(habito);
    }
    
    @GetMapping("/list/{id}")
    public ResponseEntity<Habito> obtenerHabitoPorId(@PathVariable Integer id) {
        Habito habito = habitoService.buscarHabitoPorId(id);
        if (habito == null) {
            throw new RuntimeException("No se encontró el hábito con id: " + id);
        }
        return ResponseEntity.ok(habito);
    }
    
    @GetMapping("/usuarios/{usuarioId}")
    public List<Habito> obtenerHabitosPorUsuario(@PathVariable Integer usuarioId) {
        return habitoService.buscarHabitosPorUsuario(usuarioId);
    }
    
    @GetMapping("/categorias/{categoriaId}")
    public List<Habito> obtenerHabitosPorCategoria(@PathVariable Integer categoriaId) {
        return habitoService.buscarHabitosPorCategoria(categoriaId);
    }
    
    @GetMapping("/publicos")
    public List<Habito> obtenerHabitosPublicos() {
        return habitoService.listarHabitosPublicos();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Habito> actualizarHabito(@PathVariable Integer id, @RequestBody Habito habitoRecibido) {
        Habito habito = habitoService.buscarHabitoPorId(id);
        if (habito == null) {
            throw new RuntimeException("No se encontró el hábito con id: " + id);
        }
        
        habito.setNombre(habitoRecibido.getNombre());
        habito.setDescripcion(habitoRecibido.getDescripcion());
        habito.setDificultad(habitoRecibido.getDificultad());
        habito.setFechaInicio(habitoRecibido.getFechaInicio());
        habito.setFechaFin(habitoRecibido.getFechaFin());
        habito.setRecompensa(habitoRecibido.getRecompensa());
        habito.setPublico(habitoRecibido.getPublico());
        habito.setUsuario(habitoRecibido.getUsuario());
        habito.setFrecuencia(habitoRecibido.getFrecuencia());
        habito.setCategoria(habitoRecibido.getCategoria());
        
        habitoService.guardarHabito(habito);
        return ResponseEntity.ok(habito);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarHabito(@PathVariable Integer id) {
        Habito habito = habitoService.buscarHabitoPorId(id);
        if (habito == null) {
            throw new RuntimeException("No se encontró el hábito con id: " + id);
        }
        
        habitoService.eliminarHabito(habito);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}