package com.abdelboutar.abdelboutarservice.repository;

import com.abdelboutar.abdelboutarservice.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by kalana.w on 6/15/2020.
 */
@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {
}
