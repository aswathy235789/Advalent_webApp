package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.City;
import org.springframework.data.jpa.repository.JpaRepository;
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
