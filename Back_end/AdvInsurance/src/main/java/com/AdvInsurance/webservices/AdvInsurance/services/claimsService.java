package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.dto.ClaimDto;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import com.AdvInsurance.webservices.AdvInsurance.repositories.ClaimsRepository;
//
//import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service

public class claimsService {

    @Autowired
    private ClaimsRepository claimsRepository;
//    @Autowired
//    private KieSession kieSession;

    public claimsService(ClaimsRepository claimsRepositor) {
        this.claimsRepository = claimsRepository;
//        this.kieSession = kieSession;
    }

    public Claims saveClaimSubmission(Claims claims) {
//        kieSession.insert(claims);
//        kieSession.fireAllRules();
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




    public List<ClaimDto> getAllClaims() {
        List<Object[]> resultList = claimsRepository.getAllClaims();

        List<ClaimDto> claimDtos = resultList.stream()
                .map(this::mapToObject)
                .collect(Collectors.toList());

        return claimDtos;
    }

    private ClaimDto mapToObject(Object[] result) {
        ClaimDto claimDto = new ClaimDto();

        claimDto.setClaimId((Long)result[1]);


       claimDto.setDateOfSubmission(result[2].toString());

        claimDto.setAmountBilled(result[0].toString());




        claimDto.setMemberName(result[3] + " " + result[4]);

        return claimDto;
    }

//    @Autowired
//    public void ClaimService(KieSession kieSession) {
//        this.kieSession = kieSession;
//    }




}
