package com.states_and_city.webservices.state_and_cities;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

        import java.util.List;
import java.util.Optional;

@Service
public class StateService {
    private final StateRepository stateRepository;

    @Autowired
    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    public List<State> findAll() {
        return stateRepository.findAll();
    }

    public State findById(Long id) {
//        return stateRepository.findById(id)
//                .orElseThrow(() -> new NotFoundException("State not found with id: " + id));
        Optional<State> state = stateRepository.findById(id);
        if (state.isPresent()) {
            return state.get();
        } else {
            throw new RuntimeException("State not found with id: " + id);
        }

    }

    public State getStateById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<State> state = stateRepository.findById(id);
        if (state.isPresent()) {
            return state.get();
        } else {
            throw new RuntimeException("State not found with id: " + id);
        }
    }



    // Add any additional custom methods or business logic here
}
