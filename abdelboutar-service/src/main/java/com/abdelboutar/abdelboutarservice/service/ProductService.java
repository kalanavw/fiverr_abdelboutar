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

    public EsResponse<List<Product>> findProducts(String name) {
        return new EsResponse<>(1, productsRepository.findByNameLike(name), "");
    }
}
