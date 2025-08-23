// SessionController.java
package com.examly.springapp.controller;

import com.examly.springapp.dto.SessionDTO;
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
    public ResponseEntity<?> createSession(@PathVariable Long instructorId, @RequestBody SessionDTO sessionDTO) {
        if (sessionDTO.getSessionName() == null || sessionDTO.getSessionName().isEmpty() ||
                sessionDTO.getSessionTime() == null || sessionDTO.getDurationMinutes() == null ||
                sessionDTO.getEmotion() == null || sessionDTO.getSlots() == null) {
            return ResponseEntity.badRequest().body("Mandatory fields missing");
        }

        try {
            SessionDTO createdSession = sessionService.createSession(instructorId, sessionDTO);
            return ResponseEntity.ok(createdSession);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @GetMapping("/instructors/{instructorId}/sessions")
    public ResponseEntity<List<SessionDTO>> getSessions(@PathVariable Long instructorId) {
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
    public ResponseEntity<List<SessionDTO>> getAvailableSessions(
            @RequestParam(required = false) String emotion) {
        List<SessionDTO> sessions = sessionService.getAllAvailableSessions();

        if (emotion != null && !emotion.isEmpty()) {
            sessions = sessions.stream()
                    .filter(s -> s.getEmotion().equalsIgnoreCase(emotion))
                    .toList();
        }

        return ResponseEntity.ok(sessions);
    }
}
