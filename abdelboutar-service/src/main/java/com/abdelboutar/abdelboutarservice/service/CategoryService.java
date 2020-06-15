package com.abdelboutar.abdelboutarservice.service;

import com.abdelboutar.abdelboutarservice.model.Category;
import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by kalana.w on 6/15/2020.
 */
@Service
public class CategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    public EsResponse<List<Category>> findAll() {
        return new EsResponse<>(1, this.categoryRepository.findAll(), "");
    }
}
