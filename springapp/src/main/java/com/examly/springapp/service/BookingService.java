package com.examly.springapp.service;

import com.examly.springapp.dto.BookingDTO;
import com.examly.springapp.dto.SessionDTO;
import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.model.Session;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Optional<Session> sessionOpt = sessionService.getSessionById(sessionId);

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

    // Updated method to return DTOs
    public List<BookingDTO> getBookingsByUser(Long userId) {
        List<Booking> bookings = bookingRepo.findBookingsWithSessionByUserId(userId);

        return bookings.stream().map(booking -> {
            Session session = booking.getSession();
            SessionDTO sessionDTO = new SessionDTO(
                    session.getSessionId(),
                    session.getSessionName(),
                    session.getSessionTime(),
                    session.getDurationMinutes(),
                    session.getMeetingLink()
                    , session.getEmotion(),
                    session.getSlots()
            );
            return new BookingDTO(booking.getBookingId(), sessionDTO);
        }).collect(Collectors.toList());
    }

    /**
     * Check if a user has booked the specified session.
     * @param userId ID of the user
     * @param sessionId ID of the session
     * @return true if booking exists, false otherwise
     */
    public boolean hasUserBookedSession(Long userId, Long sessionId) {
        return bookingRepo.existsByUserUserIdAndSessionSessionId(userId, sessionId);
    }
}
