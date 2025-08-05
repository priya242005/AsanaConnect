package com.examly.springapp.controller;

import com.examly.springapp.model.Slot;
import com.examly.springapp.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/slot")
public class SlotController {

    @Autowired
    private SlotService service;

    @PostMapping("/add")
    public ResponseEntity<?> addSlot(@RequestBody Slot slot) {
        return ResponseEntity.ok(service.addSlot(slot));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllSlots() {
        return ResponseEntity.ok(service.getAllSlots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSlotById(@PathVariable Long id) {
        Slot slot = service.getSlotById(id);
        return slot != null ? ResponseEntity.ok(slot) : ResponseEntity.status(404).body("Slot not found");
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<?> getByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(service.getSlotsByInstructor(instructorId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSlot(@PathVariable Long id, @RequestBody Slot slot) {
        Slot updated = service.updateSlot(id, slot);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("Slot not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable Long id) {
        boolean deleted = service.deleteSlot(id);
        return deleted ? ResponseEntity.ok("Slot deleted") : ResponseEntity.status(404).body("Slot not found");
    }
}
