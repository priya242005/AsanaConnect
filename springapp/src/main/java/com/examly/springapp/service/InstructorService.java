package com.examly.springapp.service;

import com.examly.springapp.exception.InvalidCertificationException;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.repository.InstructorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepo repo;

    public Instructor addInstructor(Instructor instructor) {
        if (instructor.getCertification() == null || instructor.getCertification().isEmpty()) {
            throw new InvalidCertificationException("Certification cannot be empty.");
        }
        return repo.save(instructor);
    }

    public List<Instructor> getAllInstructors() {
        return repo.findAll();
    }

    public Instructor getInstructorById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Instructor getInstructorByName(String name) {
        return repo.findByNameIgnoreCase(name).orElse(null);
    }

    public Instructor updateInstructor(Long id, Instructor updated) {
        Instructor existing = repo.findById(id).orElse(null);
        if (existing != null) {
            if (updated.getCertification() == null || updated.getCertification().isEmpty()) {
                throw new InvalidCertificationException("Certification cannot be empty.");
            }
            existing.setName(updated.getName());
            existing.setCertification(updated.getCertification());
            existing.setYogaSpecialty(updated.getYogaSpecialty());
            existing.setClassPreference(updated.getClassPreference());
            existing.setPhoneNumber(updated.getPhoneNumber());
            existing.setExperienceYears(updated.getExperienceYears());
            existing.setHourlyRate(updated.getHourlyRate());
            existing.setStylesOffered(updated.getStylesOffered());
            existing.setIntroVideoUrl(updated.getIntroVideoUrl());
            existing.setGender(updated.getGender());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteInstructor(Long id) {
        Instructor existing = repo.findById(id).orElse(null);
        if (existing != null) {
            repo.delete(existing);
            return true;
        }
        return false;
    }
}
