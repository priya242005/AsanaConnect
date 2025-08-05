package com.examly.springapp.controller;

import com.examly.springapp.model.Session;
import com.examly.springapp.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private SessionService service;

    @PostMapping("/add")
    public ResponseEntity<?> addSession(@RequestBody Session session) {
        return ResponseEntity.ok(service.addSession(session));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllSessions() {
        return ResponseEntity.ok(service.getAllSessions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSessionById(@PathVariable Long id) {
        Session session = service.getSessionById(id);
        return session != null ? ResponseEntity.ok(session) : ResponseEntity.status(404).body("Session not found");
    }

    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<?> getByLearner(@PathVariable Long learnerId) {
        return ResponseEntity.ok(service.getSessionsByLearnerId(learnerId));
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<?> getByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(service.getSessionsByInstructorId(instructorId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSession(@PathVariable Long id, @RequestBody Session session) {
        Session updated = service.updateSession(id, session);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("Session not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSession(@PathVariable Long id) {
        boolean deleted = service.deleteSession(id);
        return deleted ? ResponseEntity.ok("Session deleted") : ResponseEntity.status(404).body("Session not found");
    }
}
