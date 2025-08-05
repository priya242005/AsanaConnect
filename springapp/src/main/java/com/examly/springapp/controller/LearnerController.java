package com.examly.springapp.controller;

import com.examly.springapp.model.Learner;
import com.examly.springapp.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learner")
public class LearnerController {

    @Autowired
    private LearnerService service;

    @PostMapping("/add")
    public ResponseEntity<Learner> addLearner(@RequestBody Learner learner) {
        return ResponseEntity.ok(service.addLearner(learner));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Learner>> getAllLearners() {
        return ResponseEntity.ok(service.getAllLearners());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getLearnerById(@PathVariable Long id) {
        Learner learner = service.getLearnerById(id);
        return learner != null ? ResponseEntity.ok(learner) : ResponseEntity.status(404).body("Learner not found");
    }

    @GetMapping("/getbyname/{name}")
    public ResponseEntity<?> getLearnerByName(@PathVariable String name) {
        Learner learner = service.getLearnerByName(name);
        return learner != null ? ResponseEntity.ok(learner) : ResponseEntity.status(404).body("Learner not found");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateLearner(@PathVariable Long id, @RequestBody Learner updated) {
        Learner learner = service.updateLearner(id, updated);
        return learner != null ? ResponseEntity.ok(learner) : ResponseEntity.status(404).body("Learner not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLearner(@PathVariable Long id) {
        return service.deleteLearner(id) ?
                ResponseEntity.ok("Learner deleted successfully.") :
                ResponseEntity.status(404).body("Learner not found");
    }
}
