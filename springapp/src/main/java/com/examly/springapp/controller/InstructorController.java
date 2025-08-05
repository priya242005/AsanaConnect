package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exception.InvalidCertificationException;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.service.InstructorService;

@RestController
@RequestMapping("/api")
public class InstructorController {
    @Autowired
    private InstructorService obj;
    
    @PostMapping("/instructor/add")
    public ResponseEntity<?> addInstructor(@RequestBody Instructor ins)
    {
        try{
            Instructor saved = obj.addInstructor(ins);
            return ResponseEntity.ok(saved);

        }
        catch(InvalidCertificationException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/getall")
    public ResponseEntity<?> getAllInstructors()
    {
        try{
            List<Instructor> instructors = obj.getAllInstructors();
            return ResponseEntity.ok(instructors);
        }
        catch(Exception e)
        {
            return ResponseEntity.internalServerError().body("Something went wrong.");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getInstructorById(@PathVariable Long id) {
        Instructor ins = obj.getInstructorById(id);
        if (ins != null) {
            return ResponseEntity.ok(ins);
        } else {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getInstructorByName(@PathVariable String name) {
        Instructor ins = obj.getInstructorByName(name);
        if (ins != null) {
            return ResponseEntity.ok(ins);
        } else {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateInstructor(@PathVariable Long id, @RequestBody Instructor updated) {
        try {
            Instructor result = obj.updateInstructor(id, updated);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(404).body("Instructor not found");
            }
        } catch (InvalidCertificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable Long id) {
        boolean deleted = obj.deleteInstructor(id);
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
