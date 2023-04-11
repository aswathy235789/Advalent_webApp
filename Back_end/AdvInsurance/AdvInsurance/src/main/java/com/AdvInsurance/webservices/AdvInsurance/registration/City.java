package com.AdvInsurance.webservices.AdvInsurance.registration;

import jakarta.persistence.*;

@Entity
@Table(name = "city")
public class City {



        @Id
        private Long id;
        private String name;
        @ManyToOne
        @JoinColumn(name = "state_id")
        private State state;



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

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
// getters and setters
    }


//        @Id
//        @GeneratedValue(strategy = GenerationType.IDENTITY)
//        private Long id;
//
//        @Column(name = "name")
//        private String name;
//
//        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "state_id")
//        private State state;
//
//        // getters and setters
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public State getState() {
//        return state;
//    }
//
//    public void setState(State state) {
//        this.state = state;
//    }
//}


