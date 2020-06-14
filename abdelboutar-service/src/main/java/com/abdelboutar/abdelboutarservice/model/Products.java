package com.abdelboutar.abdelboutarservice.model;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Copyright (c) 2018. scicom.com.my - All Rights Reserved
 * Created by kalana.w on 5/8/2020.
 */
@Data
@Entity
@DynamicUpdate
@Table(name = "PRODUCTS")
public class Products implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false, updatable = false)
    private long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "RATING")
    private Integer rating;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @Column(name = "MODIFIED_DATE", nullable = false)
    @LastModifiedDate
    private LocalDateTime modifiedDate = LocalDateTime.now();

}
