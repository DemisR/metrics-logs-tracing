package com.example.demoopentracing;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Cars {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Brand may not be blank")
    private String brand;

    @NotBlank(message = "Model may not be blank")
    private String model;

    public Cars() {
        super();
    }

    public Cars(Long id, String brand, String model) {
        super();
        this.id = id;
        this.brand = brand;
        this.model = model;
    }

    public Cars(String brand, String model) {
        super();
        this.brand = brand;
        this.model = model;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
