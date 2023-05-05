package com.AdvInsurance.webservices.AdvInsurance.dto;

import java.time.LocalDate;
import java.util.Date;

public class ClaimHistoryDto {

    public Long getMember_id() {
        return member_id;
    }

    public void setMember_id(Long member_id) {
        this.member_id = member_id;
    }

    private Long member_id;
    private Long claimId;
    private String typeOfClaim;
    private LocalDate dateOfSubmission;
    private String providerName;
    private Double amountBilled;

    public LocalDate getDateOfService() {
        return dateOfService;
    }

    public void setDateOfService(LocalDate dateOfService) {
        this.dateOfService = dateOfService;
    }

    private LocalDate dateOfService;

    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }

    public String getTypeOfClaim() {
        return typeOfClaim;
    }

    public void setTypeOfClaim(String typeOfClaim) {
        this.typeOfClaim = typeOfClaim;
    }

    public LocalDate getDateOfSubmission() {
        return dateOfSubmission;
    }

    public void setDateOfSubmission(LocalDate dateOfSubmission) {
        this.dateOfSubmission = dateOfSubmission;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public Double getAmountBilled() {
        return amountBilled;
    }

    public void setAmountBilled(Double amountBilled) {
        this.amountBilled = amountBilled;
    }





    public ClaimHistoryDto(Long claimId, String typeOfClaim, LocalDate dateOfSubmission, String providerName,
                           Double amountBilled, LocalDate dateOfService) {
        this.claimId = claimId;
        this.typeOfClaim = typeOfClaim;
        this.dateOfSubmission = dateOfSubmission;
        this.providerName = providerName;
        this.amountBilled = amountBilled;
        this.dateOfService = dateOfService;
    }

}
