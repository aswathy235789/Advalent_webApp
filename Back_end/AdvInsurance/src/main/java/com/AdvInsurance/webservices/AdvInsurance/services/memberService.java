package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.AdvInsurance.webservices.AdvInsurance.repositories.memberRepository;

import java.util.List;

@Service
public class memberService {

    @Autowired
    private memberRepository memberRepository;

//    public memberService(com..webservices.HealthInsuranceClaims.registration.memberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }

    public member saveRegistration(member registration) {
        //Encode the password
        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
        String encrypt_psd=bcrypt.encode(registration.getPassword());
        registration.setPassword(encrypt_psd);
        registration.setRole("user"); //set default as user

        return memberRepository.save(registration);
    }

    public List<member> findByFirstName(String firstName) {
        return memberRepository.findByFirstName(firstName);
    }
//    public List<Member> findByEmail(String email) {
//        return memberRepository.findByEmail(email);
//    }




    }





    // add more methods here as needed

