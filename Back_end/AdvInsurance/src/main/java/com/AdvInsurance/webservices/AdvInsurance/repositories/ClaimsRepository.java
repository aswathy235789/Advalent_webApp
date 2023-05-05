package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClaimsRepository extends JpaRepository<Claims, Long> {
      Claims save(Claims claims);



    @Query( "SELECT c.amount_billed, c.claim_id, c.date_of_submission, m.firstName, m.lastName FROM Claims c INNER JOIN member m ON c.member_id = m.id")

    List<Object[]> getAllClaims();
    List<Claims> findByMemberId(Long member_id);




}
