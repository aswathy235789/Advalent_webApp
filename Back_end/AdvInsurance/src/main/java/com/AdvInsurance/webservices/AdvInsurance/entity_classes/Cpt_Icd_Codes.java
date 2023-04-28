package com.AdvInsurance.webservices.AdvInsurance.entity_classes;


import jakarta.persistence.*;

@Entity
@Table(name = "cpt_icd")
public class Cpt_Icd_Codes {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @ManyToOne
        @JoinColumn(name = "cpt_id")
        private Cpt_Codes cptCode;

        @ManyToOne
        @JoinColumn(name = "icd_id")
        private Icd_Codes icdCode;

        private double charges;

            public int getId() {
                return id;
            }

            public void setId(int id) {
                this.id = id;
            }

            public Cpt_Codes getCptCode() {
                return cptCode;
            }

            public void setCptCode(Cpt_Codes cptCode) {
                this.cptCode = cptCode;
            }

            public Icd_Codes getIcdCode() {
                return icdCode;
            }

            public void setIcdCode(Icd_Codes icdCode) {
                this.icdCode = icdCode;
            }

            public double getCharges() {
                return charges;
            }

            public void setCharges(double charges) {
                this.charges = charges;
            }
}


