package com.abdelboutar.abdelboutarservice.controller;

import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.Products;
import com.abdelboutar.abdelboutarservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<EsResponse<List<Products>>> findProducts(
            @RequestParam(required = false) String name
    ) {
        return ResponseEntity.ok(this.productService.findProducts(queryLikeAny(name)));
    }

    public String queryLikeAny(String param) {
        String wildcard = "%";
        if (param == null || param.isEmpty() || param.equalsIgnoreCase("null") || param.equalsIgnoreCase("undefined")) {
            param = "";
        }
        return wildcard + param + wildcard;
    }
}
