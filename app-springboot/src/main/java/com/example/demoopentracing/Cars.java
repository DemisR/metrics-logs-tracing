package com.example.demoopentracing;
import lombok.Data;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@RestResource(rel= "cars", path = "cars")
public class Cars {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Brand")
    private String brand;

    @NotBlank(message = "Model")
    private String model;

    private String owner;

}
