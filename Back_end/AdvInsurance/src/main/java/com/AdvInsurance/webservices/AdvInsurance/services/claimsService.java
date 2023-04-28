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
}
