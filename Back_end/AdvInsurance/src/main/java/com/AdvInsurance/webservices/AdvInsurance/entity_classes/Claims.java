package com.AdvInsurance.webservices.AdvInsurance.entity_classes;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="claims")
public class Claims {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long claim_id;

//        @ManyToOne(fetch = FetchType.LAZY)
        @Column(name = "member_id", nullable = false)
        private  Long member_id;

        @Column(name = "date_of_service")
        private LocalDate date_of_service;

        @Column(name = "amount_billed")
        private Double amount_billed;

        @Column(name = "provider_name")
        private String provider_name;

        @Column(name = "provider_type_id")
        private Long provider_type_id;

        @Column(name = "provider_phone_number")
        private String provider_phone_number;

        @Column(name = "provider_address")
        private String provider_address;

        @Column(name = "type_of_claim")
        private String type_of_claim;

        @Column(name = "cpt_code")
        private String cpt_code;

        @Column(name = "icd_code")
        private String icd_code;

        @Column(name = "eligibility")
        private String eligibility;

        @Column(name = "status")
        private String status;

        @Column(name = "date_of_submission")
        private LocalDate date_of_submission;

    public Long getClaim_id() {
        return claim_id;
    }

    public void setClaim_id(Long claim_id) {
        this.claim_id = claim_id;
    }

    public Long getMember_id() {
        return member_id;
    }

    public void setMember_id(Long member_id) {
        this.member_id = member_id;
    }

    public LocalDate getDate_of_service() {
        return date_of_service;
    }

    public void setDate_of_service(LocalDate date_of_service) {
        this.date_of_service = date_of_service;
    }

    public Double getAmount_billed() {
        return amount_billed;
    }

    public void setAmount_billed(Double amount_billed) {
        this.amount_billed = amount_billed;
    }

    public String getProvider_name() {
        return provider_name;
    }

    public void setProvider_name(String provider_name) {
        this.provider_name = provider_name;
    }

    public Long getProvider_type_id() {
        return provider_type_id;
    }

    public void setProvider_type_id(Long provider_type_id) {
        this.provider_type_id = provider_type_id;
    }

    public String getProvider_phone_number() {
        return provider_phone_number;
    }

    public void setProvider_phone_number(String provider_phone_number) {
        this.provider_phone_number = provider_phone_number;
    }

    public String getProvider_address() {
        return provider_address;
    }

    public void setProvider_address(String provider_address) {
        this.provider_address = provider_address;
    }

    public String getType_of_claim() {
        return type_of_claim;
    }

    public void setType_of_claim(String type_of_claim) {
        this.type_of_claim = type_of_claim;
    }

    public String getCpt_code() {
        return cpt_code;
    }

    public void setCpt_code(String cpt_code) {
        this.cpt_code = cpt_code;
    }

    public String getIcd_code() {
        return icd_code;
    }

    public void setIcd_code(String icd_code) {
        this.icd_code = icd_code;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate_of_submission() {
        return date_of_submission;
    }

    public void setDate_of_submission(LocalDate date_of_submission) {
        this.date_of_submission = LocalDate.now(); //set as Current Date
    }
}

