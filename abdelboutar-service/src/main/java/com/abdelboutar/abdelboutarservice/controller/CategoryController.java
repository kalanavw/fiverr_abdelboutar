package com.abdelboutar.abdelboutarservice.controller;

import com.abdelboutar.abdelboutarservice.model.Category;
import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.Product;
import com.abdelboutar.abdelboutarservice.service.CategoryService;
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
@RequestMapping("categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping
    public ResponseEntity<EsResponse<List<Category>>> findAll(
            @RequestParam(required = false) String name
    ) {
        return ResponseEntity.ok(this.categoryService.findAll());
    }

}
