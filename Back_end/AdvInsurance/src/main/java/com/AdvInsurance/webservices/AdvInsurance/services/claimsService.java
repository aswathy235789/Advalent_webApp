package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.dto.ClaimDto;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import com.AdvInsurance.webservices.AdvInsurance.repositories.ClaimsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service

public class claimsService {

    @Autowired
    private ClaimsRepository claimsRepository;

    public Claims saveClaimSubmission(Claims claims) {

        Claims savedClaim= claimsRepository.save(claims);

        return savedClaim;
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


}
