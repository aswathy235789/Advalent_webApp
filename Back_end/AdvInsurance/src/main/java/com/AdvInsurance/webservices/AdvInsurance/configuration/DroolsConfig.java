package com.AdvInsurance.webservices.AdvInsurance.configuration;
import org.kie.api.KieServices;
import org.kie.api.builder.*;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.internal.io.ResourceFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;


@Configuration
public class DroolsConfig {



    private final KieServices kieServices = KieServices.Factory.get();
    private KieFileSystem getKieFileSystem() throws IOException {
        KieServices kieServices = KieServices.Factory.get();
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource("rules/ClaimEligibilityRules.drl"));

        return kieFileSystem;
    }


    @Bean
    public KieContainer getkieContainer() throws IOException {
        System.out.println("Container created...");
        //ReleaseId releaseId = kieServices.newReleaseId("com.AdvInsurance.webservices", "AdvInsurance", "1.0-SNAPSHOT");
        getKieRepository();
        KieBuilder kb = kieServices.newKieBuilder(getKieFileSystem());
        kb.buildAll();
        KieModule kieModule = kb.getKieModule();
        KieContainer kContainer = kieServices.newKieContainer(kieModule.getReleaseId());
        return kContainer;
    }

    private void getKieRepository() {
        final KieRepository kieRepository = kieServices.getRepository();
        kieRepository.addKieModule(new KieModule() {
            public ReleaseId getReleaseId() {
                return kieRepository.getDefaultReleaseId();
            }
        });
    }


    @Bean
    public KieSession getKieSession() throws IOException {
        System.out.println("session created...");

        return getkieContainer().newKieSession();

    }



}




