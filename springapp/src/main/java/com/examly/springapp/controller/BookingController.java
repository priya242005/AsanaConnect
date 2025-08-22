package com.examly.springapp.controller;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<?> bookSession(@RequestParam Long userId, @RequestParam Long sessionId) {
        try {
            Booking booking = bookingService.bookSession(userId, sessionId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Booking>> getBookingsByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(bookingService.getBookingsByInstructor(instructorId));
    }

    @GetMapping("/count/session/{sessionId}")
    public ResponseEntity<Long> getBookingCount(@PathVariable Long sessionId) {
        return ResponseEntity.ok(bookingService.getBookingCountBySession(sessionId));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        boolean deleted = bookingService.deleteBooking(bookingId);
        if (deleted) {
            return ResponseEntity.ok("Booking deleted successfully");
        }
        return ResponseEntity.status(404).body("Booking not found");
    }
   @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }
}
