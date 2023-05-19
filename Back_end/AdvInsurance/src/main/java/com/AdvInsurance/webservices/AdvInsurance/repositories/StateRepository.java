package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

  //  List<State> findByName(String name);

}


