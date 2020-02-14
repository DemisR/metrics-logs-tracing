package com.example.demoopentracing;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "cars", path = "cars")
public interface CarsRepository extends PagingAndSortingRepository<Cars, Long> {
}
