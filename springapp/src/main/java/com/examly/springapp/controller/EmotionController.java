package com.examly.springapp.controller;

import com.examly.springapp.model.Emotion;
import com.examly.springapp.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/emotion")
public class EmotionController {

    @Autowired
    private EmotionService service;

    @PostMapping("/add")
    public ResponseEntity<?> addEmotion(@RequestBody Emotion emotion) {
        return ResponseEntity.ok(service.addEmotion(emotion));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllEmotions() {
        return ResponseEntity.ok(service.getAllEmotions());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Emotion emotion = service.getEmotionById(id);
        return emotion != null ? ResponseEntity.ok(emotion) : ResponseEntity.status(404).body("Emotion not found");
    }

    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<?> getByLearner(@PathVariable Long learnerId) {
        return ResponseEntity.ok(service.getEmotionsByLearner(learnerId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmotion(@PathVariable Long id, @RequestBody Emotion emotion) {
        Emotion updated = service.updateEmotion(id, emotion);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("Emotion not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmotion(@PathVariable Long id) {
        boolean deleted = service.deleteEmotion(id);
        return deleted ? ResponseEntity.ok("Emotion deleted") : ResponseEntity.status(404).body("Emotion not found");
    }
}
