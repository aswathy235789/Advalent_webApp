package com.AdvInsurance.webservices.AdvInsurance.entity;


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
    private Member member;

    @ManyToOne
    @JoinColumn(name = "member_disease_id")
    private MemberDisease memberDisease;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
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











