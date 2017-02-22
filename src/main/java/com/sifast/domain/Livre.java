package com.sifast.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Livre.
 */
@Entity
@Table(name = "livre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Livre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "date_publication", nullable = false)
    private LocalDate datePublication;

    @NotNull
    @Column(name = "prix", precision=10, scale=2, nullable = false)
    private BigDecimal prix;

    @ManyToOne
    private Auteur auteur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Livre titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public Livre description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDatePublication() {
        return datePublication;
    }

    public Livre datePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
        return this;
    }

    public void setDatePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public Livre prix(BigDecimal prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Auteur getAuteur() {
        return auteur;
    }

    public Livre auteur(Auteur auteur) {
        this.auteur = auteur;
        return this;
    }

    public void setAuteur(Auteur auteur) {
        this.auteur = auteur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Livre livre = (Livre) o;
        if (livre.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, livre.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Livre{" +
            "id=" + id +
            ", titre='" + titre + "'" +
            ", description='" + description + "'" +
            ", datePublication='" + datePublication + "'" +
            ", prix='" + prix + "'" +
            '}';
    }
}
