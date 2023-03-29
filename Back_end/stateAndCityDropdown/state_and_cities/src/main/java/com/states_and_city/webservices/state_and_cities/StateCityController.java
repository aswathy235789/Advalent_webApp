package com.states_and_city.webservices.state_and_cities;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/states")
public class StateCityController {
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;

    public StateCityController(StateRepository stateRepository, CityRepository cityRepository) {
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
    }

    @GetMapping
    public List<State> getStates() {
        return stateRepository.findAll();
    }

    @GetMapping("/{stateId}/cities")
    public List<City> getCitiesByStateId(@PathVariable Long stateId) {
        return cityRepository.findByStateId(stateId);
    }
}

//@RestController
//@RequestMapping("/states")
//public class StateCityController {
//
//    @Autowired
//    private StateService stateService;
//
//    @GetMapping("/{id}")
//    public ResponseEntity<State> getStateById(@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
//        State state = stateService.getStateById(id);
//        return ResponseEntity.ok().body(state);
//    }


//    @PostMapping("/")
//    public ResponseEntity<State> createState(@RequestBody State state) {
//        State createdState = stateService.createState(state);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdState);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<State> updateState(@PathVariable("id") Long id, @RequestBody State state) {
//        State updatedState = stateService.updateState(id, state);
//        return ResponseEntity.ok().body(updatedState);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteState(@PathVariable("id") Long id) {
//        stateService.deleteState(id);
//        return ResponseEntity.noContent().build();
//    }
//}
