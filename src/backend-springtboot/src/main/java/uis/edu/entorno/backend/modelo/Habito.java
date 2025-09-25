package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Habito")
public class Habito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "habito_id")
    private Integer habitoId;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id_usuario")
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "frecuencia_id", referencedColumnName = "id_frecuencia")
    private FrecuenciaHabito frecuencia;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id_categoria")
    private Categoria categoria;
    
    @Column(name = "nombre", length = 50)
    private String nombre;
    
    @Column(name = "descripcion", length = 100)
    private String descripcion;
    
    @Column(name = "dificultad", length = 50)
    private String dificultad;
    
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Column(name = "recompensa", length = 100)
    private String recompensa;
    
    @Column(name = "publico")
    private Boolean publico;
    
    // Constructores
    public Habito() {}
    
    public Habito(Usuario usuario, FrecuenciaHabito frecuencia, Categoria categoria, 
                  String nombre, String descripcion, String dificultad, 
                  LocalDate fechaInicio, LocalDate fechaFin, String recompensa, Boolean publico) {
        this.usuario = usuario;
        this.frecuencia = frecuencia;
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.dificultad = dificultad;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.recompensa = recompensa;
        this.publico = publico;
    }
    
    // Getters y Setters
    public Integer getHabitoId() {
        return habitoId;
    }
    
    public void setHabitoId(Integer habitoId) {
        this.habitoId = habitoId;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public FrecuenciaHabito getFrecuencia() {
        return frecuencia;
    }
    
    public void setFrecuencia(FrecuenciaHabito frecuencia) {
        this.frecuencia = frecuencia;
    }
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getDificultad() {
        return dificultad;
    }
    
    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }
    
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }
    
    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    
    public LocalDate getFechaFin() {
        return fechaFin;
    }
    
    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }
    
    public String getRecompensa() {
        return recompensa;
    }
    
    public void setRecompensa(String recompensa) {
        this.recompensa = recompensa;
    }
    
    public Boolean getPublico() {
        return publico;
    }
    
    public void setPublico(Boolean publico) {
        this.publico = publico;
    }
    
    @Override
    public String toString() {
        return "Habito{" +
                "habitoId=" + habitoId +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", dificultad='" + dificultad + '\'' +
                ", fechaInicio=" + fechaInicio +
                ", fechaFin=" + fechaFin +
                ", recompensa='" + recompensa + '\'' +
                ", publico=" + publico +
                '}';
    }
}