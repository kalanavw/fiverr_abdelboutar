package com.abdelboutar.abdelboutarservice;

import com.abdelboutar.abdelboutarservice.model.Category;
import com.abdelboutar.abdelboutarservice.model.Product;
import com.abdelboutar.abdelboutarservice.model.SubCategory;
import com.abdelboutar.abdelboutarservice.repository.ICategoryRepository;
import com.abdelboutar.abdelboutarservice.repository.IProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class AbdelboutarServiceApplication implements CommandLineRunner {

    @Autowired
    private IProductsRepository productsRepository;
    @Autowired
    private ICategoryRepository categoryRepository;

    public static void main(String[] args) {
        SpringApplication.run(AbdelboutarServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        this.categoryRepository.deleteAll();
        Category c1 = new Category();
        c1.setCategory("Mobile Phones");
        c1.setSubCategories(Stream.of(new SubCategory("Apple"), new SubCategory("Samsung")).collect(Collectors.toSet()));
        this.categoryRepository.save(c1);

        Category c2 = new Category();
        c2.setCategory("Electronics");
        c2.setSubCategories(Stream.of(new SubCategory("Mouse"), new SubCategory("Game Console")).collect(Collectors.toSet()));
        this.categoryRepository.save(c2);

        productsRepository.deleteAll();
        List<Product> products = new ArrayList<>();
        Product p1 = new Product();
        p1.setName("Asus Game Console");
        p1.setDescription("1st Product");
        p1.setRating(2);
        p1.setPrice(50.0);
        p1.setCategory("Mobile Phones");
        p1.setSubCategory("Apple");
        p1.setImage("http://localhost:4200/assets/img/products/product-1.png");
        products.add(p1);

        Product p2 = new Product();
        p2.setName("Dell Head set");
        p2.setDescription("2nd Product");
        p2.setRating(3);
        p2.setPrice(150.0);
        p2.setCategory("Mobile Phones");
        p2.setSubCategory("Samsung");
        p2.setImage("http://localhost:4200/assets/img/products/product-2.png");
        products.add(p2);

        Product p3 = new Product();
        p3.setName("Logitec Mouse");
        p3.setDescription("3rd Product");
        p3.setRating(5);
        p3.setPrice(130.0);
        p3.setCategory("Electronics");
        p3.setSubCategory("Mouse");
        p3.setImage("http://localhost:4200/assets/img/products/product-3.png");
        products.add(p3);

        Product p4 = new Product();
        p4.setName("Sony Ps4");
        p4.setDescription("4rd Product");
        p4.setRating(4);
        p4.setPrice(330.0);
        p4.setCategory("Electronics");
        p4.setSubCategory("Game Console");
        p4.setImage("http://localhost:4200/assets/img/products/product-4.png");
        products.add(p4);

        Product p5 = new Product();
        p5.setName("Asus Gaming console");
        p5.setDescription("5rd Product");
        p5.setRating(4);
        p5.setPrice(580.0);
        p5.setCategory("Electronics");
        p5.setSubCategory("Game Console");
        p5.setImage("http://localhost:4200/assets/img/products/product-5.png");
        products.add(p5);

        this.productsRepository.saveAll(products);
        List<Product> all = this.productsRepository.findAll();
        for (int i = 0; i < 10; i++) {
            int finalI = i;
            all.stream().forEach(product -> {
                product.setId(0);
                product.setName(product.getName().concat(" - " + finalI));
            });
            this.productsRepository.saveAll(all);
        }
    }
}
