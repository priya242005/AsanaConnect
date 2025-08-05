package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.InvalidCertificationException;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.service.InstructorService;

@RestController
@RequestMapping("/api/instructors") 
public class InstructorController {

    @Autowired
    private InstructorService obj;

   
    @PostMapping
    public ResponseEntity<?> addInstructor(@RequestBody Instructor ins) {
        try {
            Instructor saved = obj.addInstructor(ins);
            return ResponseEntity.ok(saved);
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

  
    @GetMapping
    public ResponseEntity<?> getAllInstructors() {
        try {
            List<Instructor> instructors = obj.getAllInstructors();
            return ResponseEntity.ok(instructors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong.");
        }
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<?> getInstructorById(@PathVariable Long id) {
        Instructor ins = obj.getInstructorById(id);
        return ins != null ?
                ResponseEntity.ok(ins) :
                ResponseEntity.status(404).body("Instructor not found");
    }

    
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getInstructorByName(@PathVariable String name) {
        Instructor ins = obj.getInstructorByName(name);
        return ins != null ?
                ResponseEntity.ok(ins) :
                ResponseEntity.status(404).body("Instructor not found");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInstructor(@PathVariable Long id, @RequestBody Instructor updated) {
        try {
            Instructor result = obj.updateInstructor(id, updated);
            return result != null ?
                    ResponseEntity.ok(result) :
                    ResponseEntity.status(404).body("Instructor not found");
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable Long id) {
        boolean deleted = obj.deleteInstructor(id);
        return deleted ?
                ResponseEntity.ok("Instructor deleted successfully.") :
                ResponseEntity.status(404).body("Instructor not found");
    }

 
    @ExceptionHandler(InvalidCertificationException.class)
    public ResponseEntity<String> handleCertificationException(InvalidCertificationException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
