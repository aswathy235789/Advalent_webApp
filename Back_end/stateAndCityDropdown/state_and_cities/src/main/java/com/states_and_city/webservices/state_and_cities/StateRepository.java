package com.states_and_city.webservices.state_and_cities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

  //  List<State> findByName(String name);

}


