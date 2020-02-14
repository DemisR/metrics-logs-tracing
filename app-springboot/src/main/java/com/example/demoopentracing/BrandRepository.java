package com.example.demoopentracing;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "brand", path = "brand")
public interface BrandRepository extends PagingAndSortingRepository<Brand, Long> {
    List<Brand> findByName(String name);
}
