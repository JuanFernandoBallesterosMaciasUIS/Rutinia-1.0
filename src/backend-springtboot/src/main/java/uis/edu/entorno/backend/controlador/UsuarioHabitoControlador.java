package uis.edu.entorno.backend.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uis.edu.entorno.backend.modelo.UsuarioHabito;
import uis.edu.entorno.backend.servicio.IUsuarioHabitoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rutinia-app")
@CrossOrigin(value = "http://localhost:3000")
public class UsuarioHabitoControlador {
    
    private static final Logger logger = LoggerFactory.getLogger(UsuarioHabitoControlador.class);
    
    @Autowired
    private IUsuarioHabitoService usuarioHabitoService;
    
    @GetMapping("/usuario-habitos")
    public List<UsuarioHabito> obtenerUsuarioHabitos() {
        var usuarioHabitos = usuarioHabitoService.listarUsuarioHabitos();
        usuarioHabitos.forEach((usuarioHabito -> logger.info(usuarioHabito.toString())));
        return usuarioHabitos;
    }
    
    @PostMapping("/usuario-habitos")
    public UsuarioHabito agregarUsuarioHabito(@RequestBody UsuarioHabito usuarioHabito) {
        logger.info("Usuario-Hábito a agregar: " + usuarioHabito);
        return usuarioHabitoService.guardarUsuarioHabito(usuarioHabito);
    }
    
    @GetMapping("/usuario-habitos/{id}")
    public ResponseEntity<UsuarioHabito> obtenerUsuarioHabitoPorId(@PathVariable Integer id) {
        UsuarioHabito usuarioHabito = usuarioHabitoService.buscarUsuarioHabitoPorId(id);
        if (usuarioHabito == null) {
            throw new RuntimeException("No se encontró la relación usuario-hábito con id: " + id);
        }
        return ResponseEntity.ok(usuarioHabito);
    }
    
    @GetMapping("/usuario-habitos/usuario/{usuarioId}")
    public List<UsuarioHabito> obtenerPorUsuario(@PathVariable Integer usuarioId) {
        return usuarioHabitoService.buscarPorUsuario(usuarioId);
    }
    
    @GetMapping("/usuario-habitos/habito/{habitoId}")
    public List<UsuarioHabito> obtenerPorHabito(@PathVariable Integer habitoId) {
        return usuarioHabitoService.buscarPorHabito(habitoId);
    }
    
    @GetMapping("/usuario-habitos/estado/{estado}")
    public List<UsuarioHabito> obtenerPorEstado(@PathVariable String estado) {
        return usuarioHabitoService.buscarPorEstado(estado);
    }
    
    @PutMapping("/usuario-habitos/{id}")
    public ResponseEntity<UsuarioHabito> actualizarUsuarioHabito(@PathVariable Integer id, @RequestBody UsuarioHabito usuarioHabitoRecibido) {
        UsuarioHabito usuarioHabito = usuarioHabitoService.buscarUsuarioHabitoPorId(id);
        if (usuarioHabito == null) {
            throw new RuntimeException("No se encontró la relación usuario-hábito con id: " + id);
        }
        
        usuarioHabito.setFechaInicio(usuarioHabitoRecibido.getFechaInicio());
        usuarioHabito.setEstado(usuarioHabitoRecibido.getEstado());
        usuarioHabito.setVecesCompletado(usuarioHabitoRecibido.getVecesCompletado());
        usuarioHabito.setUsuario(usuarioHabitoRecibido.getUsuario());
        usuarioHabito.setHabito(usuarioHabitoRecibido.getHabito());
        
        usuarioHabitoService.guardarUsuarioHabito(usuarioHabito);
        return ResponseEntity.ok(usuarioHabito);
    }
    
    @DeleteMapping("/usuario-habitos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarUsuarioHabito(@PathVariable Integer id) {
        UsuarioHabito usuarioHabito = usuarioHabitoService.buscarUsuarioHabitoPorId(id);
        if (usuarioHabito == null) {
            throw new RuntimeException("No se encontró la relación usuario-hábito con id: " + id);
        }
        
        usuarioHabitoService.eliminarUsuarioHabito(usuarioHabito);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}