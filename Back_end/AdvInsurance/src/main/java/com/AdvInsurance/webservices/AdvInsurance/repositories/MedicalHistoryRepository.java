package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {
    List<MedicalHistory> findByMemberId(Long memberId);
}
