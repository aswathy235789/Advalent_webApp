package com.AdvInsurance.webservices.AdvInsurance.RestController;

import com.AdvInsurance.webservices.AdvInsurance.entity_classes.*;
import com.AdvInsurance.webservices.AdvInsurance.login_auth.JwtUtil;
import com.AdvInsurance.webservices.AdvInsurance.login_auth.LoginRequest;
import com.AdvInsurance.webservices.AdvInsurance.repositories.*;
import com.AdvInsurance.webservices.AdvInsurance.services.memberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class memberController {

    private final com.AdvInsurance.webservices.AdvInsurance.services.memberService memberService;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;
    @Autowired
    private DiseasesRepository diseaseRepository;
    @Autowired
    private JwtUtil jwtUtil;


//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private memberRepository memberRepository;
    @Autowired
    private MemberDiseaseRepository memberDiseaseRepository;

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    public memberController(memberService memberService, StateRepository stateRepository, CityRepository cityRepository, JwtUtil jwtUtil, com.AdvInsurance.webservices.AdvInsurance.repositories.memberRepository memberRepository) {
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
                                   //
                                    member savedMember = memberService.saveRegistration(newMember);


                                    return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
                                } catch (Exception e) {
                                    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                                }
                            }


//    @PostMapping("/register")
//    public ResponseEntity<Map<String, Long>> register(@RequestBody member newMember) {
//        try {
//            member savedMember = memberService.saveRegistration(newMember);
//            Map<String, Long> response = new HashMap<>();
//            response.put("id", savedMember.getId());
//            return new ResponseEntity<>(response, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


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

    @GetMapping("/diseases")
    public List<Diseases> getDiseases() {
        return diseaseRepository.findAll();

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

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest authenticationRequest) {
//        String email = authenticationRequest.getEmail();
//        String password = authenticationRequest.getPassword();
//
//        // Verify email and password
//        //System.out.println("password= "+password);
//        if (isValidUser(email, password)) {
//            // Generate JWT token
//            String token = JwtUtil.generateToken(email);
//            return ResponseEntity.ok(token);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }

//    private boolean isValidUser(String email, String password) {
//        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
//       // String encrypt_psd=bcrypt.encode(password);
//        //encrypt the passed psd
//        member member = memberRepository.findByEmail(email);//check if email present or not
//
//         if(member != null)
//         {
//             if(bcrypt.matches(password,member.getPassword()))
//             {
//                 return true;
//             }
//         }
//          return false;
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
            if (!isValidEmail(email)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        }
    }

//    Adding medical history
//    @PostMapping("/{memberId}/diseases")
//    public ResponseEntity<?> addDiseasesToMember(@PathVariable Long memberId, @RequestBody List<String> diseases) {
//        // Find the member with the given ID
//        Optional<member> optionalMember = memberRepository.findById(memberId);
//        if (!optionalMember.isPresent()) {
//            return ResponseEntity.notFound().build();
//        }
//        member member = optionalMember.get();
//
//        // Create and save MemberDisease entities for each disease
//        List<MemberDisease> memberDiseases = new ArrayList<>();
//        for (String diseaseName : diseases) {
//            MemberDisease memberDisease = new MemberDisease();
//            memberDisease.setName(diseaseName);
//            memberDiseases.add(memberDiseaseRepository.save(memberDisease));
//        }
//
//        // Insert each disease ID as a separate record in the medical_history table
//        for (MemberDisease memberDisease : memberDiseases) {
//            MedicalHistory medicalHistory = new MedicalHistory();
//            medicalHistory.setMember(member);
//            medicalHistory.setMemberDisease(memberDisease);
//            medicalHistoryRepository.save(medicalHistory);
//        }
//
//        return ResponseEntity.ok("Medical history added successfully.");
//    }



//    start

    @PostMapping("/{memberId}/diseases")
    public ResponseEntity<?> addDiseasesToMember(@PathVariable Long memberId, @RequestBody List<String> diseases) {
        // Find the member with the given ID
        Optional<member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        member member = optionalMember.get();

        // Create and save MemberDisease entities for each new disease
        List<MemberDisease> newMemberDiseases = new ArrayList<>();
        for (String diseaseName : diseases) {
            Optional<MemberDisease> optionalDisease = memberDiseaseRepository.findByName(diseaseName);
            MemberDisease memberDisease;
            if (optionalDisease.isPresent()) {
                // Disease already exists in the member disease table
                memberDisease = optionalDisease.get();
            } else {
                // Create a new disease entity and save it to the member disease table
                memberDisease = new MemberDisease();
                memberDisease.setName(diseaseName);
                memberDisease = memberDiseaseRepository.save(memberDisease);
                newMemberDiseases.add(memberDisease);
            }

            // Update medical history table with the disease ID
            MedicalHistory medicalHistory = new MedicalHistory();
            medicalHistory.setMember(member);
            medicalHistory.setMemberDisease(memberDisease);
            medicalHistoryRepository.save(medicalHistory);
        }

        if (newMemberDiseases.size() > 0) {
            return ResponseEntity.ok("New diseases added and medical history updated successfully.");
        } else {
            return ResponseEntity.ok("Medical history updated successfully.");
        }
    }

    //end






    private boolean isValidEmail(String email) {
        // Check if email contains '@' and '.'
        //if (email != null && email.contains("@") && email.contains(".")) {
            member member = memberRepository.findByEmail(email);
            if (member != null) {
                return true; // Email exists in database
            }
       // }
        return false; // Email does not exist in database or is not valid
    }




    private boolean isValidUser(String email, String password) {
        boolean isEmailValid = false;
        boolean isPasswordValid = false;
        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
        member member = memberRepository.findByEmail(email);
        if(member != null)
        {
            if(bcrypt.matches(password,member.getPassword()))
            {
                isEmailValid = true;
                isPasswordValid = true;
            } else {
                isEmailValid = true;
            }
        }
        return (isEmailValid && isPasswordValid);
    }



}











