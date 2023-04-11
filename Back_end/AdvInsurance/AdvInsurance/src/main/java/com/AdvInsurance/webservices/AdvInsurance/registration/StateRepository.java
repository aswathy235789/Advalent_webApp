package com.AdvInsurance.webservices.AdvInsurance.registration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

  //  List<State> findByName(String name);

}


