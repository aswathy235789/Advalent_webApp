package com.AdvInsurance.webservices.AdvInsurance.repositories;


import com.AdvInsurance.webservices.AdvInsurance.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {




    List<Member> findByFirstName(String firstName);


   

    Optional<Member> findByIdNumber(String idNumber);

    Member save(Member member);

   Optional<Member> findById(Long id);

    Member findByEmail(String email);

    Member findMemberById(Long id);
}
