package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity.Adjudicator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
    public interface AdjudicatorRepository extends JpaRepository<Adjudicator, Long> {


    Adjudicator findByUsername(String Username);
    }

