package com.abdelboutar.abdelboutarservice.controller;

import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.Product;
import com.abdelboutar.abdelboutarservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by kalana.w on 6/14/2020.
 */
@RestController
@RequestMapping("products")
public class ProductsController {
    @Autowired
    private ProductService productService;
    @GetMapping
    public ResponseEntity<EsResponse<List<Product>>> findProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subCategory,
            @RequestParam(required = false) Double priceFrom,
            @RequestParam(required = false) Double priceTo
    ) {
        return ResponseEntity.ok(this.productService.findProducts(
                queryLikeAny(name),
                queryLikeAny(category),
                queryLikeAny(subCategory),
                priceFrom,
                priceTo
        ));
    }
    @GetMapping("/{id}")
    public ResponseEntity<EsResponse<Product>> findById(@PathVariable long id){
        return ResponseEntity.ok(this.productService.findById(id));
    }

    public String queryLikeAny(String param) {
        String wildcard = "%";
        if (param == null || param.isEmpty() || param.equalsIgnoreCase("null") || param.equalsIgnoreCase("undefined")) {
            param = "";
        }
        return wildcard + param + wildcard;
    }
}
