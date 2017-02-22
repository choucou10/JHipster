package com.sifast.web.rest;

import com.sifast.SocleJHipsterApp;

import com.sifast.domain.Auteur;
import com.sifast.repository.AuteurRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AuteurResource REST controller.
 *
 * @see AuteurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SocleJHipsterApp.class)
public class AuteurResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_NAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_NAISSANCE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AuteurRepository auteurRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private EntityManager em;

    private MockMvc restAuteurMockMvc;

    private Auteur auteur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            AuteurResource auteurResource = new AuteurResource(auteurRepository);
        this.restAuteurMockMvc = MockMvcBuilders.standaloneSetup(auteurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auteur createEntity(EntityManager em) {
        Auteur auteur = new Auteur()
                .nom(DEFAULT_NOM)
                .dateNaissance(DEFAULT_DATE_NAISSANCE);
        return auteur;
    }

    @Before
    public void initTest() {
        auteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuteur() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();

        // Create the Auteur

        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isCreated());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate + 1);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAuteur.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void createAuteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();

        // Create the Auteur with an existing ID
        Auteur existingAuteur = new Auteur();
        existingAuteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingAuteur)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = auteurRepository.findAll().size();
        // set the field null
        auteur.setNom(null);

        // Create the Auteur, which fails.

        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = auteurRepository.findAll().size();
        // set the field null
        auteur.setDateNaissance(null);

        // Create the Auteur, which fails.

        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAuteurs() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get all the auteurList
        restAuteurMockMvc.perform(get("/api/auteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())));
    }

    @Test
    @Transactional
    public void getAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", auteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(auteur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAuteur() throws Exception {
        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);
        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // Update the auteur
        Auteur updatedAuteur = auteurRepository.findOne(auteur.getId());
        updatedAuteur
                .nom(UPDATED_NOM)
                .dateNaissance(UPDATED_DATE_NAISSANCE);

        restAuteurMockMvc.perform(put("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuteur)))
            .andExpect(status().isOk());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAuteur.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingAuteur() throws Exception {
        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // Create the Auteur

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAuteurMockMvc.perform(put("/api/auteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isCreated());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);
        int databaseSizeBeforeDelete = auteurRepository.findAll().size();

        // Get the auteur
        restAuteurMockMvc.perform(delete("/api/auteurs/{id}", auteur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Auteur.class);
    }
}
