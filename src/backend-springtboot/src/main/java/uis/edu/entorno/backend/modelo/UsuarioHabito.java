package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Usuario_Habito")
public class UsuarioHabito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_uh")
    private Integer idUh;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id_usuario")
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "id_habito", referencedColumnName = "habito_id")
    private Habito habito;
    
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "estado", length = 20)
    private String estado;
    
    @Column(name = "veces_completado")
    private Integer vecesCompletado;
    
    // Constructores
    public UsuarioHabito() {}
    
    public UsuarioHabito(Usuario usuario, Habito habito, LocalDate fechaInicio, 
                        String estado, Integer vecesCompletado) {
        this.usuario = usuario;
        this.habito = habito;
        this.fechaInicio = fechaInicio;
        this.estado = estado;
        this.vecesCompletado = vecesCompletado;
    }
    
    // Getters y Setters
    public Integer getIdUh() {
        return idUh;
    }
    
    public void setIdUh(Integer idUh) {
        this.idUh = idUh;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public Habito getHabito() {
        return habito;
    }
    
    public void setHabito(Habito habito) {
        this.habito = habito;
    }
    
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }
    
    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public Integer getVecesCompletado() {
        return vecesCompletado;
    }
    
    public void setVecesCompletado(Integer vecesCompletado) {
        this.vecesCompletado = vecesCompletado;
    }
    
    @Override
    public String toString() {
        return "UsuarioHabito{" +
                "idUh=" + idUh +
                ", fechaInicio=" + fechaInicio +
                ", estado='" + estado + '\'' +
                ", vecesCompletado=" + vecesCompletado +
                '}';
    }
}