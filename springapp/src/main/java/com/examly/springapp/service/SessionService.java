package com.examly.springapp.service;

import com.examly.springapp.dto.SessionDTO;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.model.Session;
import com.examly.springapp.repository.SessionRepo;
import com.examly.springapp.repository.BookingRepo;
import com.examly.springapp.repository.FeedbackRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionRepo sessionRepo;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private BookingRepo bookingRepo; // Injected here

    @Autowired
    private FeedbackRepository feedbackRepo; // Injected here

    private String generateMeetingLink() {
        return "https://meet.example.com/" + UUID.randomUUID().toString();
    }

    public SessionDTO createSession(Long instructorId, SessionDTO sessionDTO) {
        Instructor instructor = instructorService.getInstructorById(instructorId);
        if (instructor == null) {
            throw new RuntimeException("Instructor not found");
        }

        Session session = new Session();
        session.setSessionName(sessionDTO.getSessionName());
        session.setSessionTime(sessionDTO.getSessionTime());
        session.setDurationMinutes(sessionDTO.getDurationMinutes());
        session.setEmotion(sessionDTO.getEmotion());
        session.setSlots(sessionDTO.getSlots());
        session.setMeetingLink(generateMeetingLink());
        session.setInstructor(instructor);

        Session savedSession = sessionRepo.save(session);
        return mapToDTO(savedSession);
    }

    public List<SessionDTO> getSessionsByInstructor(Long instructorId) {
        List<Session> sessions = sessionRepo.findAllByInstructorInstructorId(instructorId);
        return sessions.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional  // Add this annotation here
    public boolean deleteSession(Long sessionId) {
        return sessionRepo.findById(sessionId).map(session -> {
            bookingRepo.deleteBySessionSessionId(sessionId);
            feedbackRepo.deleteBySessionSessionId(sessionId);
            sessionRepo.delete(session);
            return true;
        }).orElse(false);
    }


    public Optional<Session> getSessionById(Long sessionId) {
        return sessionRepo.findById(sessionId);
    }

    public List<SessionDTO> getAllAvailableSessions() {
        List<Session> sessions = sessionRepo.findAll();

        // Filter sessions where bookings.size < slots (available slots)
        List<Session> filtered = sessions.stream()
                .filter(s -> {
                    int bookedCount = s.getBookings() == null ? 0 : s.getBookings().size();
                    return bookedCount < s.getSlots();
                })
                .collect(Collectors.toList());

        return filtered.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private SessionDTO mapToDTO(Session session) {
        return new SessionDTO(
                session.getSessionId(),
                session.getSessionName(),
                session.getSessionTime(),
                session.getDurationMinutes(),
                session.getMeetingLink(),
                session.getEmotion(),
                session.getSlots()
        );
    }
}
