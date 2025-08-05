package com.examly.springapp.controller;

import com.examly.springapp.model.SupportTicket;
import com.examly.springapp.service.SupportTicketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/support")
@Tag(name = "Support Ticket", description = "Endpoints for managing support/help tickets")
public class SupportTicketController {

    @Autowired
    private SupportTicketService service;

    @PostMapping("/create")
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        return ResponseEntity.ok(service.createTicket(ticket));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SupportTicket>> getAllTickets() {
        return ResponseEntity.ok(service.getAllTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        SupportTicket ticket = service.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.status(404).body("Ticket not found");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportTicket>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getTicketsByUserId(userId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SupportTicket ticket) {
        SupportTicket updated = service.updateTicket(id, ticket);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("Ticket not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.deleteTicket(id) ? ResponseEntity.ok("Deleted successfully") : ResponseEntity.status(404).body("Ticket not found");
    }
}
