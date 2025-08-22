package com.examly.springapp.controller;

import com.examly.springapp.model.Session;
import com.examly.springapp.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/instructors/{instructorId}/sessions/create")
    public ResponseEntity<?> createSession(@PathVariable Long instructorId, @RequestBody Session session) {
        if (session.getSessionName() == null || session.getSessionName().isEmpty() ||
            session.getSessionTime() == null || session.getDurationMinutes() == null) {
            return ResponseEntity.badRequest().body("Mandatory fields missing");
        }

        try {
            Session created = sessionService.createSession(instructorId, session);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/instructors/{instructorId}/sessions")
    public ResponseEntity<List<Session>> getSessions(@PathVariable Long instructorId) {
        return ResponseEntity.ok(sessionService.getSessionsByInstructor(instructorId));
    }

    @DeleteMapping("/instructors/sessions/{sessionId}")
    public ResponseEntity<?> deleteSession(@PathVariable Long sessionId) {
        boolean deleted = sessionService.deleteSession(sessionId);
        if (deleted) {
            return ResponseEntity.ok("Session deleted successfully");
        }
        return ResponseEntity.status(404).body("Session not found");
    }
    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }
}
