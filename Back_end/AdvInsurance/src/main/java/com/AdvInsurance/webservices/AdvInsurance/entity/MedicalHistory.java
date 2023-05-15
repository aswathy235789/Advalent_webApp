package com.AdvInsurance.webservices.AdvInsurance.entity_classes;


import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "medical_history")
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private com.AdvInsurance.webservices.AdvInsurance.entity_classes.member member;

    @ManyToOne
    @JoinColumn(name = "member_disease_id")
    private MemberDisease memberDisease;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.AdvInsurance.webservices.AdvInsurance.entity_classes.member getMember() {
        return member;
    }

    public void setMember(com.AdvInsurance.webservices.AdvInsurance.entity_classes.member member) {
        this.member = member;
    }

    public MemberDisease getMemberDisease() {
        return memberDisease;
    }

    public void setMemberDisease(MemberDisease memberDisease) {
        this.memberDisease = memberDisease;
    }



// Constructors, getters, and setters
}











