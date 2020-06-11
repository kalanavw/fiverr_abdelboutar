package com.abdelboutar.abdelboutarservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * Copyright (c) 2018. scicom.com.my - All Rights Reserved
 * Created by kalana.w on 5/6/2020.
 */
@Data
@AllArgsConstructor
public class EsResponse<T> implements Serializable {
    private int status;
    private T data;
    private String message;

    public EsResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
