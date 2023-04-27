package com.AdvInsurance.webservices.AdvInsurance.repositories;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.adjudicator;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
    public interface adjudicatorRepository  extends JpaRepository<adjudicator, Long> {


    adjudicator findByUsername(String Username);
    }

