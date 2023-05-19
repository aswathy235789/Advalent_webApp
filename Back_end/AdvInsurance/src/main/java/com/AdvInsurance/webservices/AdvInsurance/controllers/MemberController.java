package com.AdvInsurance.webservices.AdvInsurance.controllers;
import com.AdvInsurance.webservices.AdvInsurance.configuration.DroolsConfig;
import com.AdvInsurance.webservices.AdvInsurance.entity.*;
import com.AdvInsurance.webservices.AdvInsurance.authentication.JwtUtil;
import com.AdvInsurance.webservices.AdvInsurance.authentication.LoginRequest;
import com.AdvInsurance.webservices.AdvInsurance.repositories.*;
import com.AdvInsurance.webservices.AdvInsurance.services.ClaimsService;
import com.AdvInsurance.webservices.AdvInsurance.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MemberController {

    private final StateRepository stateRepository;
    private final CityRepository cityRepository;


    @Autowired
    private DiseasesRepository diseaseRepository;

    @Autowired
    private ClaimsRepository claimsRepository;

    @Autowired
    private MemberService memberService;
    @Autowired
    private ClaimsService claimsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private DroolsConfig droolsConfig;

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberDiseaseRepository memberDiseaseRepository;

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private IcdRepository Icd_codeRepository;
    @Autowired
    private CptRepository Cpt_codeRepository;

    @Autowired
    private AdjudicatorRepository adjudicatorRepository;

    @Autowired
    private ProvidersRepository providersRepository;

      @Autowired
    public MemberController(MemberService memberService, StateRepository stateRepository, CityRepository cityRepository, ClaimsService claimsService, JwtUtil jwtUtil) {
        this.memberService = memberService;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
        // this.claimsHistoryService = claimsHistoryService;
        this.claimsService = claimsService;
        this.jwtUtil = jwtUtil;
       // this.memberRepository = memberRepository;
    }

    // Register a member
                            @PostMapping("/register")
                            public ResponseEntity<Member> register(@RequestBody Member newMember) {
                                try {
                                   //

                                    Member savedMember = memberService.saveRegistration(newMember);


                                    return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                                }
                            }


    // Get registrations by first name
    @GetMapping("/registrations/{firstName}")
    public ResponseEntity<List<Member>> getRegistrationsByFirstName(@PathVariable String firstName) {
        try {
            List<Member> registrations = memberService.findByFirstName(firstName);

            if (registrations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(registrations, HttpStatus.OK);
            }
        } catch (Exception e) {

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest authenticationRequest) {
        String email = authenticationRequest.getEmail();
        String password = authenticationRequest.getPassword();

        // Verify email and password
        if (isValidUser(email, password)) {


            Member logged_user=memberRepository.findByEmail(email);
            String token = JwtUtil.generateToken(email); // Generate JWT token
            String role = logged_user.getRole();
            Long memberId = logged_user.getId();
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("Id", String.valueOf(memberId));
            responseBody.put("role", role);
            return ResponseEntity.ok(responseBody);
        } else {
            if (!isValidEmail(email)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        }
    }



    @PostMapping("/{memberId}/diseases")
    public ResponseEntity<?> addDiseasesToMember(@PathVariable Long memberId, @RequestBody List<String> diseases) {
        // Find the member with the given ID
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Member member = optionalMember.get();

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


    private boolean isValidEmail(String email) {

            Member member = memberRepository.findByEmail(email);
            if (member != null) {
                return true; // Email exists in database
            }
               return false; // Email does not exist in database or is not valid
    }

    private boolean isValidUser(String email, String password) {
        boolean isEmailValid = false;
        boolean isPasswordValid = false;
        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
        Member member = memberRepository.findByEmail(email);
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

    @GetMapping("/search/icd")
    public List<Icd_Codes> search_ICD(@RequestParam("q") String searchTerm) {
        return Icd_codeRepository.findByCodeContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchTerm, searchTerm);
    }
    @GetMapping("/search/cpt")
    public List<Cpt_Codes> search_CPT(@RequestParam("q") String searchTerm) {
       return Cpt_codeRepository.findByCodeContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchTerm, searchTerm);
    }

    @GetMapping("/providers")

    public List<Providers> getProviders() {
        return providersRepository.findAll();
    }




    @PostMapping("/claims/submission")
    public ResponseEntity<?> claimSubmission(@RequestBody Claims claims) {
        try {
            Claims savedClaim = claimsService.saveClaimSubmission(claims);

            return new ResponseEntity<>(savedClaim, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




//    @GetMapping("/claims/status/{id}")
//    public ResponseEntity<?> getClaimStatus(@PathVariable("id") Long id) {
//        try {
//            Claims claim = claimsService.getClaimById(id);
//            if (claim != null) {
//
//                return new ResponseEntity<>(claim, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Claim not found", HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/claims/history/{memberId}")
    public List<Object[]> getClaimsByMemberId(@PathVariable Long memberId) {
        try {
            return claimsRepository.findMemberById(memberId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching claims for memberId " + memberId, e);
        }
    }

        }














