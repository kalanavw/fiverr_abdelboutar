package com.abdelboutar.abdelboutarservice.repository;

import com.abdelboutar.abdelboutarservice.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by kalana.w on 6/14/2020.
 */
@Repository
public interface IProductsRepository extends JpaRepository<Products, Long> {
    List<Products> findByNameLike(String name);
}
