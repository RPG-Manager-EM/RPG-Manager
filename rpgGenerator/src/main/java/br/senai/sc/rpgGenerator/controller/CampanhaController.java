package br.senai.sc.rpgGenerator.controller;

import br.senai.sc.rpgGenerator.dto.CampanhaDTO;
import br.senai.sc.rpgGenerator.model.entities.*;
import br.senai.sc.rpgGenerator.model.service.*;
import br.senai.sc.rpgGenerator.util.CampanhaUtil;
import br.senai.sc.rpgGenerator.util.MapaUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@AllArgsConstructor
@RequestMapping("rpg_manager/campanha")
public class CampanhaController {
    private CampanhaService campanhaService;
    private MapaService mapaService;
    private UsuarioService usuarioService;
    private ImagemService imagemService;
    private PersonagemService personagemService;

    @GetMapping
    public ResponseEntity<List<Campanha>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value = "id") Long id) {
        if (!campanhaService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar a campanha!");
        }

        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findById(id).get());
    }

    @GetMapping("/nome/{nome}/{senha}")
    public ResponseEntity<Object> findByNomeAndSenha(@PathVariable(value = "nome") String nome, @PathVariable(value = "senha") String senha) {
        if (!campanhaService.existsByNomeAndSenha(nome, senha)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar a campanha!");
        }

        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findByNomeAndSenhaAndArquivada(nome, senha, false));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Object> findByUsuario(@PathVariable(value = "id") Long id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findByUsuarioAndArquivada(usuario, false));
    }

    @GetMapping("/usuario/nome/{id}/{nome}")
    public ResponseEntity<Object> findByUsuarioAndNome(@PathVariable(value = "id") Long id, @PathVariable(value = "nome") String nome) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findByUsuarioAndNomeAndArquivada(usuario, nome, false));
    }

    @GetMapping("/usuario/{id}/arquivadas")
    public ResponseEntity<Object> findByUsuarioArquivadas(@PathVariable(value = "id") Long id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findByUsuarioAndArquivada(usuario, true));
    }

    @GetMapping("/page")
    public ResponseEntity<List<Campanha>> findPage(@RequestParam Long usuarioId, @RequestParam(required = false) String nome) {

        Usuario usuario = usuarioService.findById(usuarioId);
        if (nome != null && !nome.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findPage(usuario, nome));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(campanhaService.findPage(usuario));
        }
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("campanha") String campanhaJson,
                                       @RequestParam("logo") MultipartFile file,
                                       @RequestParam("mapa") String id) {
        Optional<Mapa> mapa = mapaService.findById(Long.parseLong(id));

        CampanhaUtil campanhaUtil = new CampanhaUtil();
        Campanha campanha = campanhaUtil.convertJsonToModel(campanhaJson);
        campanha.setImagem(file);
        campanha.setMapa(mapa.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(campanhaService.save(campanha));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") Long id,
                                         @RequestParam("campanha") String campanhaJson,
                                         @RequestParam("logo") String idLogo,
                                         @RequestParam("mapa") Mapa mapa) {
        System.out.println("chegou aq");
        if (!campanhaService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Esta campanha não existe.");
        }

        System.out.println("id: " + id);
        System.out.println("campanhaJson: " + campanhaJson);
        System.out.println("idlogo: " + idLogo);

        CampanhaUtil campanhaUtil = new CampanhaUtil();
        Campanha campanha = campanhaUtil.convertJsonToFullModel(campanhaJson);
        System.out.println("dpois");
        Optional<Imagem> imagem = imagemService.findById(Long.parseLong(idLogo));

        campanha.setImagemExistente(imagem.get());
        campanha.setMapa(mapa);
        campanha.setId(id);

        return ResponseEntity.status(HttpStatus.OK).body(campanhaService.save(campanha));
    }

    @PutMapping("/personagem/{id}/{personagemId}")
    public ResponseEntity<Object> addPersonagem(@PathVariable(value = "id") Long id,
                                                @PathVariable(value = "personagemId") Long personagemId) {
        Personagem personagem = personagemService.findById(personagemId).get();
        Campanha campanha = campanhaService.findById(id).get();
        personagem.setCampanha(campanha);

        return ResponseEntity.status(HttpStatus.OK).body(personagemService.save(personagem));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {
        if (!campanhaService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar a campanha!");
        }

        campanhaService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Campanha deletada com sucesso!");
    }
}

