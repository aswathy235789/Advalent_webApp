package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.dto.ClaimHistoryDto;
import com.AdvInsurance.webservices.AdvInsurance.entity_classes.Claims;
import com.AdvInsurance.webservices.AdvInsurance.repositories.ClaimsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service

public class ClaimsHistoryService {

    private final ClaimsRepository claimsRepository;

    public ClaimsHistoryService(ClaimsRepository claimsRepository) {
        this.claimsRepository = claimsRepository;
    }


    public List<ClaimHistoryDto> getClaimHistoryForMember(Long member_id) {
        List<Claims> claims = claimsRepository.findByMemberId(member_id);
        return claims.stream()
                .map(claim -> new ClaimHistoryDto(
                        claim.getClaim_id(),
                        claim.getType_of_claim(),
                        claim.getDate_of_submission(),
                        claim.getProvider_name(),
                        claim.getAmount_billed(),
                        claim.getDate_of_service()
                ))
                .collect(Collectors.toList());
    }
}
