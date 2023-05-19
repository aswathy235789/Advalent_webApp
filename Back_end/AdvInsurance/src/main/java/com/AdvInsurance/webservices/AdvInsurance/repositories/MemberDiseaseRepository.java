package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity.MemberDisease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberDiseaseRepository extends JpaRepository<MemberDisease, Long> {
    Optional<MemberDisease> findByName(String diseaseName);
}
