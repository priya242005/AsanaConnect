package com.examly.springapp.controller;

import com.examly.springapp.exception.InvalidCertificationException;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService service;

    @PostMapping
    public ResponseEntity<?> addInstructor(@RequestBody Instructor ins) {
        try {
            Instructor saved = service.addInstructor(ins);
            return ResponseEntity.ok(saved);
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllInstructors() {
        try {
            List<Instructor> instructors = service.getAllInstructors();
            return ResponseEntity.ok(instructors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInstructorById(@PathVariable Long id) {
        Instructor ins = service.getInstructorById(id);
        if (ins != null) {
            return ResponseEntity.ok(ins);
        } else {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getInstructorByName(@PathVariable String name) {
        Instructor ins = service.getInstructorByName(name);
        if (ins != null) {
            return ResponseEntity.ok(ins);
        } else {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInstructor(@PathVariable Long id, @RequestBody Instructor updated) {
        try {
            Instructor result = service.updateInstructor(id, updated);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(404).body("Instructor not found");
            }
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable Long id) {
        boolean deleted = service.deleteInstructor(id);
        if (deleted) {
            return ResponseEntity.ok("Instructor deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @ExceptionHandler(InvalidCertificationException.class)
    public ResponseEntity<String> handleCertificationException(InvalidCertificationException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
