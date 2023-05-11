package com.AdvInsurance.webservices.AdvInsurance.RestController;


import com.AdvInsurance.webservices.AdvInsurance.dto.ClaimDto;
import com.AdvInsurance.webservices.AdvInsurance.entity.Claims;
import com.AdvInsurance.webservices.AdvInsurance.entity.Adjudicator;
import com.AdvInsurance.webservices.AdvInsurance.login.auth.AdjudicatorLoginRequest;
import com.AdvInsurance.webservices.AdvInsurance.login.auth.JwtUtil;
import com.AdvInsurance.webservices.AdvInsurance.repositories.adjudicatorRepository;
import com.AdvInsurance.webservices.AdvInsurance.services.claimsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/adjudicator")
public class AdjudicatorController {

    @Autowired
    private adjudicatorRepository adjudicatorRepository;

    @Autowired
    private claimsService claimsService;

    @PostMapping("/login")
    public ResponseEntity<?> adjudicator_login(@RequestBody AdjudicatorLoginRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        Adjudicator adjudicator = adjudicatorRepository.findByUsername(username); // Check that the username is exists or not
        if (adjudicator != null) { // If username exists

            if (adjudicator.getPassword().equals(password)) { // If password matches

                // Generate JWT token (Login Success)
                String token = JwtUtil.generate_Adjudicator_Token(username);
                return ResponseEntity.ok(token);

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found.");
        }
    }


    @GetMapping("/dashboard")
    public List<ClaimDto> getAllClaims() {
        return claimsService.getAllClaims();
    }
    @GetMapping("/view-details/{id}")
    public Map<String, Object> getClaimDetails(@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
        return claimsService.getClaimDetails(id);
    }

    @PutMapping("/update-action/{id}")
    public ResponseEntity<?> updateClaimStatus(@PathVariable Long id, @RequestBody String status) {
        Claims claim = claimsService.getClaimById(id);
        if (claim == null) {
            return ResponseEntity.notFound().build();
        }
        claim.setStatus(status.trim());//To avoid unwanted spaces
        Claims updatedClaim = claimsService.save(claim);
        return ResponseEntity.ok(updatedClaim);
    }

}
