package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import com.AdvInsurance.webservices.AdvInsurance.repositories.ClaimsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service

public class claimsService {

    @Autowired
    private ClaimsRepository claimsRepository;

    public Claims saveClaimSubmission(Claims claims) {

        Claims savedClaim= claimsRepository.save(claims);

        return savedClaim;
    }
//    public Claims getClaimById(Long id) {
//        // Retrieve the claim details from the data store using the claim ID
//        Claims claim =claimsService.getClaimById(id);
//
//        return claim;
//    }

    public Claims getClaimById(Long id) {

        Claims claim = claimsRepository.findById(id).orElse(null);

        return claim;
    }

}
