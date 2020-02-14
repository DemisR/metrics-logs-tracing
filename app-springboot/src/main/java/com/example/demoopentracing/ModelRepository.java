package com.example.demoopentracing;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "model", path = "model")
public interface ModelRepository extends PagingAndSortingRepository<Model, Long> {
}
