package com.AdvInsurance.webservices.AdvInsurance.entity_classes;

import jakarta.persistence.*;

@Entity
@Table(name="diseases")
public class Diseases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;

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
}