package br.senai.sc.rpgGenerator.model.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false)
    private String senha;
}
