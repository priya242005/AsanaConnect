package com.examly.springapp.controller;

import com.examly.springapp.model.Notification;
import com.examly.springapp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(service.sendNotification(notification));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAll() {
        return ResponseEntity.ok(service.getAllNotifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Notification note = service.getNotificationById(id);
        return note != null ? ResponseEntity.ok(note) : ResponseEntity.status(404).body("Notification not found");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getNotificationsByUser(userId));
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification updated = service.markAsRead(id);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(404).body("Notification not found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean deleted = service.deleteNotification(id);
        return deleted ? ResponseEntity.ok("Deleted successfully") : ResponseEntity.status(404).body("Not found");
    }
}
