package com.AdvInsurance.webservices.AdvInsurance.dto;


public class ClaimDto {
    private Long claimId;
    private String dateOfSubmission;
    private String amountBilled;
    private String memberName;






    public String getMemberName() {
        return memberName;
    }


    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }





    public String getAmountBilled() {
        return amountBilled;
    }

    public void setAmountBilled(String amountBilled) {
        this.amountBilled = amountBilled;
    }


    public String getDateOfSubmission() {
        return dateOfSubmission;
    }

    public void setDateOfSubmission(String dateOfSubmission) {
        this.dateOfSubmission = dateOfSubmission;
    }






}
