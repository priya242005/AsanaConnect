package com.examly.springapp.service;

import com.examly.springapp.model.Instructor;
import com.examly.springapp.model.Session;
import com.examly.springapp.repository.SessionRepo;
import com.examly.springapp.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SessionService {

    @Autowired
    private SessionRepo sessionRepo;

    @Autowired
    private InstructorService instructorService;

    // Generate meeting link (dummy unique URL)
    private String generateMeetingLink() {
        return "https://meet.example.com/" + UUID.randomUUID().toString();
    }

    public Session createSession(Long instructorId, Session session) {
        Instructor instructor = instructorService.getInstructorById(instructorId);
        if (instructor == null) {
            throw new RuntimeException("Instructor not found");
        }
        session.setInstructor(instructor);
        session.setMeetingLink(generateMeetingLink());
        return sessionRepo.save(session);
    }

    public List<Session> getSessionsByInstructor(Long instructorId) {
        return sessionRepo.findAllByInstructorInstructorId(instructorId);
    }

    public boolean deleteSession(Long sessionId) {
        return sessionRepo.findById(sessionId).map(session -> {
            sessionRepo.delete(session);
            return true;
        }).orElse(false);
    }

    public Session getSessionById(Long sessionId) {
        return sessionRepo.findById(sessionId).orElse(null);
    }
    public List<Session> getAllSessions() {
        return sessionRepo.findAll();
    }
}
