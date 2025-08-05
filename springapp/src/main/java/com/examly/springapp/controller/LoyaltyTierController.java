package com.examly.springapp.controller;

import com.examly.springapp.model.LoyaltyTier;
import com.examly.springapp.service.LoyaltyTierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loyalty")
public class LoyaltyTierController {

    @Autowired
    private LoyaltyTierService service;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody LoyaltyTier tier) {
        return ResponseEntity.ok(service.addTier(tier));
    }

    @GetMapping("/getall")
    public ResponseEntity<List<LoyaltyTier>> getAll() {
        return ResponseEntity.ok(service.getAllTiers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        LoyaltyTier tier = service.getById(id);
        return tier != null ? ResponseEntity.ok(tier) : ResponseEntity.status(404).body("LoyaltyTier not found");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody LoyaltyTier tier) {
        LoyaltyTier updated = service.updateTier(id, tier);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("LoyaltyTier not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.deleteTier(id) ? ResponseEntity.ok("Deleted") : ResponseEntity.status(404).body("Not found");
    }
}
