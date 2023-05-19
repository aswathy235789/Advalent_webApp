package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity.Claims;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClaimsRepository extends JpaRepository<Claims, Long> {


    Claims save(Claims claims);



    @Query( "SELECT c.amount_billed, c.claim_id, c.date_of_submission, m.firstName, m.lastName, c.eligibility FROM Claims c INNER JOIN Member m ON c.member_id = m.id")
    List<Object[]> getAllClaims();

@Query("SELECT c.claim_id, c.date_of_submission, c.type_of_claim, c.amount_billed, c.status FROM Claims c WHERE c.member_id = :memberId")
List<Object[]> findMemberById(@Param("memberId") Long memberId);






}
