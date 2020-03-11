package com.example.demoopentracing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.AnyMetaDefs;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@RestResource(rel="model", path="model")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name may not be blank")
    private String name;

    @NotBlank(message = "Brand may not be blank")
    private String brand;

    // Implement get model details calling python app and search on internet
}
