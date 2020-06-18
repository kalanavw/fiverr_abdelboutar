package com.abdelboutar.abdelboutarservice.service;

import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.Product;
import com.abdelboutar.abdelboutarservice.repository.IProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by kalana.w on 6/14/2020.
 */
@Service
public class ProductService {
    @Autowired
    private IProductsRepository productsRepository;

    public EsResponse<List<Product>> findProducts(String name, String category, String subCategory, Double priceFrom, Double priceTo) {
        List<Product> productList = this.productsRepository
                .findByNameLikeAndCategoryLikeAndSubCategoryLikeAndPriceGreaterThanEqualAndPriceLessThanEqual(
                        name,
                        category,
                        subCategory,
                        priceFrom,
                        priceTo
                );
        return new EsResponse<>(1, productList, "");
    }
}
