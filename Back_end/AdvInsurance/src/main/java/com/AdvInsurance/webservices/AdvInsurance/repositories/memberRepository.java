package com.AdvInsurance.webservices.AdvInsurance.repositories;


import com.AdvInsurance.webservices.AdvInsurance.entity_classes.member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface memberRepository  extends JpaRepository<member, Long> {




    List<member> findByFirstName(String firstName);


    member findMemberById(Long id);

       member save(member member);

   Optional<member> findById(Long id);

    member findByEmail(String email);
}

