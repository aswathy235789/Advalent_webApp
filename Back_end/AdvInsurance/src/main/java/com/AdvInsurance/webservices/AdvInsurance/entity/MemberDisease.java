package com.AdvInsurance.webservices.AdvInsurance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;



@Entity
@Table(name = "member_disease")
public class MemberDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
// Constructors, getters, and setters
}
