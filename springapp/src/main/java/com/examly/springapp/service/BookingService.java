package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.model.Session;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BookingRepo;
import com.examly.springapp.service.InstructorService;
import com.examly.springapp.service.SessionService;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private InstructorService instructorService;

    public Booking bookSession(Long userId, Long sessionId) {
        Optional<User> userOpt = Optional.ofNullable(userService.getUserById(userId));
        Optional<Session> sessionOpt = Optional.ofNullable(sessionService.getSessionById(sessionId));

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Session not found");
        }

        Session session = sessionOpt.get();
        Instructor instructor = session.getInstructor();

        Booking booking = new Booking();
        booking.setUser(userOpt.get());
        booking.setSession(session);
        booking.setInstructor(instructor);

        return bookingRepo.save(booking);
    }

    public List<Booking> getBookingsByInstructor(Long instructorId) {
        return bookingRepo.findAllByInstructorInstructorId(instructorId);
    }

    public Long getBookingCountBySession(Long sessionId) {
        return bookingRepo.countBySessionSessionId(sessionId);
    }

    public boolean deleteBooking(Long bookingId) {
        if (bookingRepo.existsById(bookingId)) {
            bookingRepo.deleteById(bookingId);
            return true;
        }
        return false;
    }
   public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepo.findBookingsWithSessionByUserId(userId);
    }
   
}
