package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "Frecuencia_Habito")
public class FrecuenciaHabito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_frecuencia")
    private Integer idFrecuencia;
    
    @Column(name = "tipo", length = 20)
    private String tipo;
    
    @Column(name = "veces")
    private Integer veces;
    
    // Constructores
    public FrecuenciaHabito() {}
    
    public FrecuenciaHabito(String tipo, Integer veces) {
        this.tipo = tipo;
        this.veces = veces;
    }
    
    // Getters y Setters
    public Integer getIdFrecuencia() {
        return idFrecuencia;
    }
    
    public void setIdFrecuencia(Integer idFrecuencia) {
        this.idFrecuencia = idFrecuencia;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public Integer getVeces() {
        return veces;
    }
    
    public void setVeces(Integer veces) {
        this.veces = veces;
    }
    
    @Override
    public String toString() {
        return "FrecuenciaHabito{" +
                "idFrecuencia=" + idFrecuencia +
                ", tipo='" + tipo + '\'' +
                ", veces=" + veces +
                '}';
    }
}