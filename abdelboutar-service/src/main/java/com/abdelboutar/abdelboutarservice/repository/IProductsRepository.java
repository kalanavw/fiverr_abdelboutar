package com.abdelboutar.abdelboutarservice.repository;

import com.abdelboutar.abdelboutarservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by kalana.w on 6/14/2020.
 */
@Repository
public interface IProductsRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameLike(String name);

    List<Product> findByNameLikeAndCategoryLikeAndSubCategoryLikeAndPriceGreaterThanEqualAndPriceLessThanEqual(
            String name,
            String category,
            String subCategory,
            Double priceFrom,
            Double priceTp
    );
}
