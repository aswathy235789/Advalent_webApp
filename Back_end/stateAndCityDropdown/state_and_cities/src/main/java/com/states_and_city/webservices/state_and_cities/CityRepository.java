package com.states_and_city.webservices.state_and_cities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//public interface CityRepository extends JpaRepository<City, Long> {
//
////    @Query("SELECT c.name FROM City c WHERE c.state.id = :stateId")
////    List<String> findCityNamesByStateId(@Param("stateId") Long stateId);
//}

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findByStateId(Long stateId);
}
