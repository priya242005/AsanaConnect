package com.examly.springapp.controller;

import com.examly.springapp.model.WellnessTracker;
import com.examly.springapp.service.WellnessTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

 

@RestController
@RequestMapping("/api/wellness")
public class WellnessTrackerController {

    @Autowired
    private WellnessTrackerService service;

    @PostMapping("/add")
    public ResponseEntity<?> addEntry(@RequestBody WellnessTracker tracker) {
        return ResponseEntity.ok(service.addEntry(tracker));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        WellnessTracker tracker = service.getById(id);
        return tracker != null ? ResponseEntity.ok(tracker) : ResponseEntity.status(404).body("Not found");
    }

    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<?> getByLearner(@PathVariable Long learnerId) {
        return ResponseEntity.ok(service.getByLearnerId(learnerId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody WellnessTracker updated) {
        WellnessTracker result = service.updateEntry(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.status(404).body("Not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.deleteEntry(id) ? ResponseEntity.ok("Deleted") : ResponseEntity.status(404).body("Not found");
    }
}
