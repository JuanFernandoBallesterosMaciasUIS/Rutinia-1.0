package uis.edu.entorno.backend.modelo;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "Recordatorio")
public class Recordatorio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recordatorio")
    private Integer idRecordatorio;
    
    @ManyToOne
    @JoinColumn(name = "id_habito", referencedColumnName = "habito_id")
    private Habito habito;
    
    @Column(name = "hora")
    private LocalTime hora;
    
    @Column(name = "tipo_repeticion", length = 20)
    private String tipoRepeticion;
    
    @Column(name = "intervalo")
    private Integer intervalo;
    
    @Column(name = "dias_semana", length = 20)
    private String diasSemana;
    
    @Column(name = "veces")
    private Integer veces;
    
    // Constructores
    public Recordatorio() {}
    
    public Recordatorio(Habito habito, LocalTime hora, String tipoRepeticion, 
                       Integer intervalo, String diasSemana, Integer veces) {
        this.habito = habito;
        this.hora = hora;
        this.tipoRepeticion = tipoRepeticion;
        this.intervalo = intervalo;
        this.diasSemana = diasSemana;
        this.veces = veces;
    }
    
    // Getters y Setters
    public Integer getIdRecordatorio() {
        return idRecordatorio;
    }
    
    public void setIdRecordatorio(Integer idRecordatorio) {
        this.idRecordatorio = idRecordatorio;
    }
    
    public Habito getHabito() {
        return habito;
    }
    
    public void setHabito(Habito habito) {
        this.habito = habito;
    }
    
    public LocalTime getHora() {
        return hora;
    }
    
    public void setHora(LocalTime hora) {
        this.hora = hora;
    }
    
    public String getTipoRepeticion() {
        return tipoRepeticion;
    }
    
    public void setTipoRepeticion(String tipoRepeticion) {
        this.tipoRepeticion = tipoRepeticion;
    }
    
    public Integer getIntervalo() {
        return intervalo;
    }
    
    public void setIntervalo(Integer intervalo) {
        this.intervalo = intervalo;
    }
    
    public String getDiasSemana() {
        return diasSemana;
    }
    
    public void setDiasSemana(String diasSemana) {
        this.diasSemana = diasSemana;
    }
    
    public Integer getVeces() {
        return veces;
    }
    
    public void setVeces(Integer veces) {
        this.veces = veces;
    }
    
    @Override
    public String toString() {
        return "Recordatorio{" +
                "idRecordatorio=" + idRecordatorio +
                ", hora=" + hora +
                ", tipoRepeticion='" + tipoRepeticion + '\'' +
                ", intervalo=" + intervalo +
                ", diasSemana='" + diasSemana + '\'' +
                ", veces=" + veces +
                '}';
    }
}