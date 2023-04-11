package com.AdvInsurance.webservices.AdvInsurance.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class memberController {

    private final memberService memberService;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private memberRepository memberRepository;

    @Autowired
    public memberController(memberService memberService, StateRepository stateRepository, CityRepository cityRepository, JwtUtil jwtUtil, com.AdvInsurance.webservices.AdvInsurance.registration.memberRepository memberRepository) {
        this.memberService = memberService;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
    }

    // Register a member
    @PostMapping("/register")
    public ResponseEntity<member> register(@RequestBody member newMember) {
        try {
            member savedMember = memberService.saveRegistration(newMember);
            return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get registrations by first name
    @GetMapping("/registrations/{firstName}")
    public ResponseEntity<List<member>> getRegistrationsByFirstName(@PathVariable String firstName) {
        try {
            List<member> registrations = memberService.findByFirstName(firstName);

            if (registrations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(registrations, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/email/{email}")
//    public ResponseEntity<List<member>> getRegistrationsByEmail(@PathVariable String email) {
//        try {
//            List<member> registrations = memberService.findByEmail(email);
//
//            if (registrations.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            } else {
//                return new ResponseEntity<>(registrations, HttpStatus.OK);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }





    @GetMapping("/states")
    public List<State> getStates() {
        return stateRepository.findAll();
    }

    @GetMapping("/{stateId}/cities")
    public List<City> getCitiesByStateId(@PathVariable Long stateId) {
        return cityRepository.findByStateId(stateId);
    }





//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
//
//        member member=  memberRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
//        if (member != null) {
//            String jwt = jwtUtil.generateToken(member.getEmail());
//            return ResponseEntity.ok(jwt);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest authenticationRequest) {
        String email = authenticationRequest.getEmail();
        String password = authenticationRequest.getPassword();

        // Verify email and password
        if (isValidUser(email, password)) {
            // Generate JWT token
            String token = JwtUtil.generateToken(email);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private boolean isValidUser(String email, String password) {
        member member = memberRepository.findByEmailAndPassword(email, password);
        return member != null;
    }


}












