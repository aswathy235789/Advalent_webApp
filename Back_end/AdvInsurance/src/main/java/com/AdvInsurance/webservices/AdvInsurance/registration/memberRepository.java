package com.AdvInsurance.webservices.AdvInsurance.registration;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface memberRepository  extends JpaRepository<member, Long> {


//    @Query("SELECT m.id, m.firstName, m.lastName, m.dateOfBirth, m.phoneNumber, m.addressLine1, s.name, c.name, m.governmentId, m.govtIdNumber, m.medicalHistory, m.smoking, m.email FROM Member m JOIN m.state s JOIN m.city c WHERE m.id = :memberId")
//    Object[] getMemberWithStateAndCityNamesById(@Param("memberId") Long memberId);

    List<member> findByFirstName(String firstName);

    List<member> findByLastName(String lastName);

    List<member> findByGender(String gender);

    List<member> findByState(String state);

    List<member> findByCity(String city);

    List<member> findByGovernmentId(String governmentId);

    List<member> findByEmail(String email);

    Optional<member> findByIdNumber(String idNumber);
       member save(member member);
}

