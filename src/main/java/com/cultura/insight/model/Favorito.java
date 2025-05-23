package com.cultura.insight.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "obra_id", nullable = false)
    private String obraId;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_obra", nullable = false)
    private TipoObra tipoObra;

    @Column(name = "data_favorito")
    private LocalDateTime dataFavorito = LocalDateTime.now();
}
