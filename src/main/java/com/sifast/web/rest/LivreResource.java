package com.sifast.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sifast.domain.Livre;

import com.sifast.repository.LivreRepository;
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
 * REST controller for managing Livre.
 */
@RestController
@RequestMapping("/api")
public class LivreResource {

    private final Logger log = LoggerFactory.getLogger(LivreResource.class);

    private static final String ENTITY_NAME = "livre";
        
    private final LivreRepository livreRepository;

    public LivreResource(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    /**
     * POST  /livres : Create a new livre.
     *
     * @param livre the livre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new livre, or with status 400 (Bad Request) if the livre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/livres")
    @Timed
    public ResponseEntity<Livre> createLivre(@Valid @RequestBody Livre livre) throws URISyntaxException {
        log.debug("REST request to save Livre : {}", livre);
        if (livre.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new livre cannot already have an ID")).body(null);
        }
        Livre result = livreRepository.save(livre);
        return ResponseEntity.created(new URI("/api/livres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /livres : Updates an existing livre.
     *
     * @param livre the livre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated livre,
     * or with status 400 (Bad Request) if the livre is not valid,
     * or with status 500 (Internal Server Error) if the livre couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/livres")
    @Timed
    public ResponseEntity<Livre> updateLivre(@Valid @RequestBody Livre livre) throws URISyntaxException {
        log.debug("REST request to update Livre : {}", livre);
        if (livre.getId() == null) {
            return createLivre(livre);
        }
        Livre result = livreRepository.save(livre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, livre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /livres : get all the livres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of livres in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/livres")
    @Timed
    public ResponseEntity<List<Livre>> getAllLivres(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Livres");
        Page<Livre> page = livreRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/livres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /livres/:id : get the "id" livre.
     *
     * @param id the id of the livre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the livre, or with status 404 (Not Found)
     */
    @GetMapping("/livres/{id}")
    @Timed
    public ResponseEntity<Livre> getLivre(@PathVariable Long id) {
        log.debug("REST request to get Livre : {}", id);
        Livre livre = livreRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(livre));
    }

    /**
     * DELETE  /livres/:id : delete the "id" livre.
     *
     * @param id the id of the livre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/livres/{id}")
    @Timed
    public ResponseEntity<Void> deleteLivre(@PathVariable Long id) {
        log.debug("REST request to delete Livre : {}", id);
        livreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
