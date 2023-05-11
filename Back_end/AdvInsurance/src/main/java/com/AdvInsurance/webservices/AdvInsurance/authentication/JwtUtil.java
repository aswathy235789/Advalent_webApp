package com.AdvInsurance.webservices.AdvInsurance.login.auth;

import io.jsonwebtoken.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import org.springframework.stereotype.Component;


@Component
public class JwtUtil {

    private static final String SECRET_KEY;
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    static {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[64];
        secureRandom.nextBytes(key);
        SECRET_KEY = Base64.getEncoder().encodeToString(key);
        System.out.println(SECRET_KEY);
    }

    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static String generate_Adjudicator_Token(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

//    public static String getEmailFromToken(String token) {
//        Jws<Claims> claims = Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token);
//
//        return claims.getBody().getSubject();
//    }
//
//    public static boolean validateToken(String token) {
//        try {
//            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//            return true;
//        } catch (Exception ex) {
//            return false;
//        }
//    }


}

