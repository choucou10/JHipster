package com.sifast.repository;

import com.sifast.domain.Livre;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Livre entity.
 */
@SuppressWarnings("unused")
public interface LivreRepository extends JpaRepository<Livre,Long> {

}
