package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity.Cpt_Codes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CptRepository extends JpaRepository<Cpt_Codes, Long> {
//    List<Cpt_Codes> findByCodeContainingIgnoreCase(String searchTerm);


    List<Cpt_Codes> findByCodeContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String searchTerm, String searchTerm1);
}
