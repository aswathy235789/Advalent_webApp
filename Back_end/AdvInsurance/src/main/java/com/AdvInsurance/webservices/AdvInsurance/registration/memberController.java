package com.AdvInsurance.webservices.AdvInsurance.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class memberController {

    private final memberService memberService;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;

    @Autowired
    public memberController(memberService memberService, StateRepository stateRepository, CityRepository cityRepository) {
        this.memberService = memberService;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
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

    @GetMapping("/email/{email}")
    public ResponseEntity<List<member>> getRegistrationsByEmail(@PathVariable String email) {
        try {
            List<member> registrations = memberService.findByEmail(email);

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
}







