package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Icd_Codes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IcdRepository extends JpaRepository<Icd_Codes, Long> {
//    List<Icd_Codes> findByCodeContainingIgnoreCase(String searchTerm);
List<Icd_Codes> findByCodeContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String searchTerm, String searchTerm1);
}
