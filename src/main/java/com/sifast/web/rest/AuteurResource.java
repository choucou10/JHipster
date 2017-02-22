package com.sifast.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sifast.domain.Auteur;

import com.sifast.repository.AuteurRepository;
import com.sifast.web.rest.util.HeaderUtil;
import com.sifast.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Auteur.
 */
@RestController
@RequestMapping("/api")
public class AuteurResource {

    private final Logger log = LoggerFactory.getLogger(AuteurResource.class);

    private static final String ENTITY_NAME = "auteur";
        
    private final AuteurRepository auteurRepository;

    public AuteurResource(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    /**
     * POST  /auteurs : Create a new auteur.
     *
     * @param auteur the auteur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new auteur, or with status 400 (Bad Request) if the auteur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/auteurs")
    @Timed
    public ResponseEntity<Auteur> createAuteur(@Valid @RequestBody Auteur auteur) throws URISyntaxException {
        log.debug("REST request to save Auteur : {}", auteur);
        if (auteur.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new auteur cannot already have an ID")).body(null);
        }
        Auteur result = auteurRepository.save(auteur);
        return ResponseEntity.created(new URI("/api/auteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /auteurs : Updates an existing auteur.
     *
     * @param auteur the auteur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated auteur,
     * or with status 400 (Bad Request) if the auteur is not valid,
     * or with status 500 (Internal Server Error) if the auteur couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/auteurs")
    @Timed
    public ResponseEntity<Auteur> updateAuteur(@Valid @RequestBody Auteur auteur) throws URISyntaxException {
        log.debug("REST request to update Auteur : {}", auteur);
        if (auteur.getId() == null) {
            return createAuteur(auteur);
        }
        Auteur result = auteurRepository.save(auteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, auteur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /auteurs : get all the auteurs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of auteurs in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/auteurs")
    @Timed
    public ResponseEntity<List<Auteur>> getAllAuteurs(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Auteurs");
        Page<Auteur> page = auteurRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/auteurs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /auteurs/:id : get the "id" auteur.
     *
     * @param id the id of the auteur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the auteur, or with status 404 (Not Found)
     */
    @GetMapping("/auteurs/{id}")
    @Timed
    public ResponseEntity<Auteur> getAuteur(@PathVariable Long id) {
        log.debug("REST request to get Auteur : {}", id);
        Auteur auteur = auteurRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(auteur));
    }

    /**
     * DELETE  /auteurs/:id : delete the "id" auteur.
     *
     * @param id the id of the auteur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/auteurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuteur(@PathVariable Long id) {
        log.debug("REST request to delete Auteur : {}", id);
        auteurRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
