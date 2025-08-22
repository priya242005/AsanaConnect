package com.examly.springapp.controller;

import com.examly.springapp.exception.InvalidCertificationException;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class InstructorController {

    @Autowired
    private InstructorService service;

    @PostMapping("/addInstructor")
    public ResponseEntity<?> addInstructor(@RequestBody Instructor ins) {
        try {
            Instructor saved = service.addInstructor(ins);
            return ResponseEntity.ok(saved);
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAllInstructors")
    public ResponseEntity<?> getAllInstructors() {
        try {
            List<Instructor> instructors = service.getAllInstructors();
            return ResponseEntity.ok(instructors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong.");
        }
    }

    @GetMapping("/instructor/get/{id}")
    public ResponseEntity<?> getInstructorById(@PathVariable Long id) {
        Instructor ins = service.getInstructorById(id);
        return ins != null ? ResponseEntity.ok(ins) : ResponseEntity.status(404).body("Instructor not found");
    }

    @PutMapping("/instructor/put/{id}")
    public ResponseEntity<?> updateInstructor(@PathVariable Long id, @RequestBody Instructor updated) {
        try {
            Instructor result = service.updateInstructor(id, updated);
            return result != null ? ResponseEntity.ok(result) : ResponseEntity.status(404).body("Instructor not found");
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/instructor/delete/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable Long id) {
        boolean deleted = service.deleteInstructor(id);
        return deleted ? ResponseEntity.ok("Instructor deleted successfully.") : ResponseEntity.status(404).body("Instructor not found");
    }

    // Login endpoint
   @PostMapping("/instructor/login")
public ResponseEntity<?> loginInstructor(@RequestBody Instructor ins) {
    Instructor instructorDetails = service.getInstructorByName(ins.getName());
    if (instructorDetails != null && instructorDetails.getPassword().equals(ins.getPassword())) {
        instructorDetails.setPassword(null);  // hide password in response
        return ResponseEntity.ok(instructorDetails);
    }
    return ResponseEntity.status(401).body("Invalid name or password");
}


    @ExceptionHandler(InvalidCertificationException.class)
    public ResponseEntity<String> handleCertificationException(InvalidCertificationException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
    @PutMapping("/instructor/updatePassword/{id}")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> passwords) {

        String currentPassword = passwords.get("currentPassword");
        String newPassword = passwords.get("newPassword");

        if (currentPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Current and new password must be provided");
        }

        boolean updated = service.updatePassword(id, currentPassword, newPassword);
        if (updated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(400).body("Current password incorrect or update failed");
        }
    }
}
