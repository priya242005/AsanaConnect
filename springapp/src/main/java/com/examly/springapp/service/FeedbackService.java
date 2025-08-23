package com.examly.springapp.service;

import com.examly.springapp.dto.FeedbackCreateDTO;
import com.examly.springapp.dto.FeedbackDTO;
import com.examly.springapp.dto.FeedbackDTO.InstructorBriefDTO;
import com.examly.springapp.dto.FeedbackDTO.SessionBriefDTO;
import com.examly.springapp.dto.FeedbackDTO.UserBriefDTO;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.Instructor;
import com.examly.springapp.model.Session;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private BookingService bookingService;

    public FeedbackDTO submitFeedback(Long userId, Long sessionId, FeedbackCreateDTO feedbackCreateDTO) {
        // Check if user has booked the session
        if (!bookingService.hasUserBookedSession(userId, sessionId)) {
            throw new RuntimeException("Cannot submit feedback without booking the session");
        }

        // Check if feedback already submitted
        if (feedbackRepo.findByUserUserIdAndSessionSessionId(userId, sessionId).isPresent()) {
            throw new RuntimeException("Feedback already submitted for this session");
        }

        // Fetch user, ensure exists
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Fetch session, ensure exists
        Session session = sessionService.getSessionById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Fetch instructor from session, ensure exists
        Instructor instructor = session.getInstructor();
        if (instructor == null) {
            throw new RuntimeException("Instructor not found for session");
        }

        // Create and populate Feedback entity
        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setSession(session);
        feedback.setInstructor(instructor);
        feedback.setRating(feedbackCreateDTO.getRating());
        feedback.setComments(feedbackCreateDTO.getComments());
        feedback.setCreatedAt(LocalDateTime.now());

        // Save feedback to database
        Feedback saved = feedbackRepo.save(feedback);

        // Convert saved entity to DTO and return
        return mapToDTO(saved);
    }

    public List<FeedbackDTO> getFeedbackForSession(Long sessionId) {
        List<Feedback> feedbackList = feedbackRepo.findAllBySessionSessionId(sessionId);
        return feedbackList.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<FeedbackDTO> getFeedbackForInstructor(Long instructorId) {
        List<Feedback> feedbackList = feedbackRepo.findAllByInstructorInstructorId(instructorId);
        return feedbackList.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private FeedbackDTO mapToDTO(Feedback feedback) {
        User user = feedback.getUser();
        Session session = feedback.getSession();
        Instructor instructor = feedback.getInstructor();

        UserBriefDTO userBriefDTO = new UserBriefDTO(user.getUserId(), user.getName());
        SessionBriefDTO sessionBriefDTO = new SessionBriefDTO(session.getSessionId(), session.getSessionName());
        InstructorBriefDTO instructorBriefDTO = new InstructorBriefDTO(instructor.getInstructorId(), instructor.getName());

        return new FeedbackDTO(
                feedback.getFeedbackId(),
                feedback.getRating(),
                feedback.getComments(),
                feedback.getCreatedAt(),
                userBriefDTO,
                sessionBriefDTO,
                instructorBriefDTO);
    }
}
