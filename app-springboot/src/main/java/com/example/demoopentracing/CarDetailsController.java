package com.example.demoopentracing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CarDetailsController {
    @Autowired
    private RestTemplate restTemplate;

    @PostMapping(path = "/api/car-details",consumes = "application/json", produces = "application/json")
    public String getCarDetails(@RequestBody Model model) {
        String CarDetailsUrl = "http://app-python:5000/car-info";

        String response = restTemplate.postForObject( CarDetailsUrl, model, String .class);
        return response;
    }
}
