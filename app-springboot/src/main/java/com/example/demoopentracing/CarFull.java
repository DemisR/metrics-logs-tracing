package com.example.demoopentracing;

import org.springframework.data.rest.core.config.Projection;
import com.example.demoopentracing.Model;
import com.example.demoopentracing.Car;

@Projection( name="expand",types={Car.class})
public interface CarFull {
    String getPlaque();
    String getEmployee();
    Model getModel();

}
