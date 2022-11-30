package br.senai.sc.rpgGenerator.repository;

import br.senai.sc.rpgGenerator.model.entities.Campanha;
import br.senai.sc.rpgGenerator.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampanhaRepository extends JpaRepository<Campanha, Long> {

    List<Campanha> findByUsuarioAndNomeContaining(Usuario usuario, String nome);

    List<Campanha> findByUsuario(Usuario usuario);

    List<Campanha> findByUsuarioAndArquivada(Usuario usuario, Boolean arquivada);

    Boolean existsByNomeAndSenha(String nome, String senha);

    List<Campanha> findByUsuarioAndNomeContainingAndArquivada(Usuario usuario, String nome, boolean b);

    Object findByNomeAndSenhaAndArquivada(String nome, String senha, boolean b);
}
