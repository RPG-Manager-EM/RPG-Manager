package br.senai.sc.rpgGenerator.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class UsuarioDTO {
    private Long id;
    private String email;
    private String nome;
    private String senha;
}
