package br.senai.sc.rpgGenerator.dto;

import br.senai.sc.rpgGenerator.model.entities.*;
import lombok.*;

@Getter
@Setter
@ToString
public class CampanhaDTO {
    private String nome;
    private String descricao;
    private Usuario usuario;
    private Boolean arquivada;
    private String senha;
}
