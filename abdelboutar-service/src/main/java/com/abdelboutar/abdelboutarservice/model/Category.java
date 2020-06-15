package com.abdelboutar.abdelboutarservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Copyright (c) 2018. scicom.com.my - All Rights Reserved
 * Created by kalana.w on 5/8/2020.
 */
@Data
@Entity
@DynamicUpdate
@Table(name = "CATEGORIES")
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false, updatable = false)
    private long id;

    @Column(name = "CATEGORY_NAME")
    private String category;

    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(name = "CATEGORY_HAS_SUB_CATEGORY", joinColumns = @JoinColumn(name = "CAT_ID", referencedColumnName = "ID", foreignKey = @ForeignKey(name = "FK_CAT2SUB_CAT")),
            inverseJoinColumns = @JoinColumn(name = "SUB_CAT_ID", referencedColumnName = "ID", foreignKey = @ForeignKey(name = "FK_SUB_CAT2CAT")))
    private Set<SubCategory> subCategories;

    @Column(name = "MODIFIED_DATE", nullable = false)
    @LastModifiedDate
    private LocalDateTime modifiedDate = LocalDateTime.now();

}
