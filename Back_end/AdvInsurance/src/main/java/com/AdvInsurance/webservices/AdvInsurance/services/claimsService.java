package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.dto.ClaimDto;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.member;
import com.AdvInsurance.webservices.AdvInsurance.repositories.ClaimsRepository;
import com.AdvInsurance.webservices.AdvInsurance.repositories.memberRepository;
import com.AdvInsurance.webservices.AdvInsurance.configuration.DroolsConfig;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class claimsService {

    @Autowired
    private ClaimsRepository claimsRepository;
    @Autowired
    private KieSession kieSession;
    @Autowired
    private DroolsConfig droolsConfig;
    @Autowired
    private memberRepository memberRepository;

    public claimsService(ClaimsRepository claimsRepository) {
        this.claimsRepository = claimsRepository;
//        this.kieSession = kieSession;
    }

    public Claims saveClaimSubmission(Claims claims) throws IOException {
//        kieSession.insert(claims);
//        kieSession.fireAllRules();


        KieSession kieSession = droolsConfig.getKieSession();
        kieSession.insert(claims);
        kieSession.fireAllRules();               //Set Eligibility

        Claims savedClaim= claimsRepository.save(claims);

        return savedClaim;
    }



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

    public Map<String, Object> getClaimDetails(Long id) throws ChangeSetPersister.NotFoundException {
        Claims claim = claimsRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        LocalDate dateOfService = claim.getDate_of_service();
        String claimType = claim.getType_of_claim();
        String cptCode = claim.getCpt_code();
        String icdCode = claim.getIcd_code();
        String providerName = claim.getProvider_name();
        member member = memberRepository.findMemberById(claim.getMember_id());

        Long memberId = member.getId();
        String gender = member.getGender();
        LocalDate dateOfBirth = member.getDateOfBirth();
        Map<String, Object> response = new HashMap<>();
        response.put("dateOfService", dateOfService);
        response.put("claimType", claimType);
        response.put("cptCode", cptCode);
        response.put("icdCode", icdCode);
        response.put("providerName", providerName);
        response.put("memberId", memberId);

// response.put("lastName", lastName);
        response.put("gender", gender);
        response.put("dateOfBirth", dateOfBirth);
        return response;
    }


}
