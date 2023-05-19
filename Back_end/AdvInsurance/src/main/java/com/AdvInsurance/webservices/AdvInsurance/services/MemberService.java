package com.AdvInsurance.webservices.AdvInsurance.services;

import com.AdvInsurance.webservices.AdvInsurance.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.AdvInsurance.webservices.AdvInsurance.repositories.MemberRepository;

import java.util.List;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member saveRegistration(Member registration) {
      try {
          //Encode the password

          BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
          String encrypt_psd = bcrypt.encode(registration.getPassword());
          registration.setPassword(encrypt_psd);
          registration.setRole("user"); //set default as user

          return memberRepository.save(registration);
      }catch(Exception e)
      {
          e.printStackTrace();
          return  null;
      }
    }

    public List<Member> findByFirstName(String firstName) {
        return memberRepository.findByFirstName(firstName);
    }




    }



