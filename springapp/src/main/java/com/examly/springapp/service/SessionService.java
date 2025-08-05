package com.examly.springapp.service;

import com.examly.springapp.model.Session;
import com.examly.springapp.repository.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepo repo;

    public Session addSession(Session session) {
        return repo.save(session);
    }

    public List<Session> getAllSessions() {
        return repo.findAll();
    }

    public Session getSessionById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Session> getSessionsByLearnerId(Long learnerId) {
        return repo.findByLearnerId(learnerId);
    }

    public List<Session> getSessionsByInstructorId(Long instructorId) {
        return repo.findByInstructorId(instructorId);
    }

    public Session updateSession(Long id, Session updated) {
        Session existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setSlotId(updated.getSlotId());
            existing.setTotalPrice(updated.getTotalPrice());
            existing.setStatus(updated.getStatus());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteSession(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
