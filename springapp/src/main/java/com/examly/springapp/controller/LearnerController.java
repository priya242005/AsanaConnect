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
    private LearnerService learnerService;

    @PostMapping("/add")
    public ResponseEntity<Learner> addLearner(@RequestBody Learner learner) {
        return ResponseEntity.ok(learnerService.addLearner(learner));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Learner>> getAllLearners() {
        return ResponseEntity.ok(learnerService.getAllLearners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Learner> getLearner(@PathVariable Long id) {
        return learnerService.getLearnerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Learner> updateLearner(@PathVariable Long id, @RequestBody Learner learner) {
        return ResponseEntity.ok(learnerService.updateLearner(id, learner));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLearner(@PathVariable Long id) {
        learnerService.deleteLearner(id);
        return ResponseEntity.ok().build();
    }
}
