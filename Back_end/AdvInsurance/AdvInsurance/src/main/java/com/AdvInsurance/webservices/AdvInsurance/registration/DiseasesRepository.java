package com.AdvInsurance.webservices.AdvInsurance.registration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiseasesRepository extends  JpaRepository<Diseases, Long>{

}
