package br.senai.sc.rpgGenerator.controller;

import br.senai.sc.rpgGenerator.dto.PersonagemDTO;
import br.senai.sc.rpgGenerator.model.entities.Campanha;
import br.senai.sc.rpgGenerator.model.entities.Personagem;
import br.senai.sc.rpgGenerator.model.entities.Usuario;
import br.senai.sc.rpgGenerator.model.service.CampanhaService;
import br.senai.sc.rpgGenerator.model.service.PersonagemService;
import br.senai.sc.rpgGenerator.model.service.UsuarioService;
import br.senai.sc.rpgGenerator.util.PersonagemUtil;
import lombok.*;
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
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@AllArgsConstructor
@RequestMapping("rpg_manager/personagem")
public class PersonagemController {
    private PersonagemService personagemService;
    private UsuarioService usuarioService;
    private CampanhaService campanhaService;

    @GetMapping
    public ResponseEntity<List<Personagem>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value = "id") Long id) {
        if (!personagemService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar o personagem!");
        }

        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findById(id).get());
    }

    @GetMapping("/campanha/{id}")
    public ResponseEntity<List<Personagem>> findByCampanha(@PathVariable(value = "id") Long id) {
        Campanha campanha = campanhaService.findById(id).get();
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findByCampanha(campanha));
    }

    @GetMapping("/campanha/usuario/{id}/{usuario}")
    public ResponseEntity<Personagem> findByCampanhaAndUsuario(@PathVariable(value = "id") Long id, @PathVariable(value = "usuario") Long usuarioId) {
        Campanha campanha = campanhaService.findById(id).get();
        Usuario usuario = usuarioService.findById(usuarioId);
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findByCampanhaAndUsuario(campanha, usuario));
    }

    @GetMapping("/usuario/{usuario}")
    public ResponseEntity<List<Personagem>> findByUsuario(@PathVariable(value = "usuario") Long usuarioId){
        Usuario usuario = usuarioService.findById(usuarioId);
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findByUsuario(usuario));
    }

    @GetMapping("/campanha-null/{usuario}")
    public ResponseEntity<List<Personagem>> findByUsuarioAndCampanhaNull(@PathVariable(value = "usuario") Long usuarioId){
        Usuario usuario = usuarioService.findById(usuarioId);
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.findByUsuarioAndCampanha(usuario, null));
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Personagem>> findPage(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable,
                                                     @RequestParam Usuario usuario, @RequestParam(required = false) String nome) {
        if (nome != null && !nome.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(personagemService.findPage(usuario, nome, pageable));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(personagemService.findPage(usuario, pageable));
        }
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("personagem") String personagemJson, @RequestParam("arquivos") MultipartFile[] arquivos) {
        System.out.println("personagem: " + personagemJson);
        System.out.println("arquivos" + Arrays.toString(arquivos));
        PersonagemUtil personagemUtil = new PersonagemUtil();
        Personagem personagem = personagemUtil.convertJsonToModel(personagemJson);
        personagem.setArquivos(arquivos);
        return ResponseEntity.status(HttpStatus.CREATED).body(personagemService.save(personagem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") Long id, @RequestBody @Valid PersonagemDTO personagemDTO) {
        if (!personagemService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Este personagem não existe.");
        }

        Personagem personagem = new Personagem();
        BeanUtils.copyProperties(personagemDTO, personagem);
        personagem.setId(id);
        return ResponseEntity.status(HttpStatus.OK).body(personagemService.save(personagem));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {
        if (!personagemService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível encontrar o personagem!");
        }

        personagemService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Personagem deletado com sucesso!");
    }
}
