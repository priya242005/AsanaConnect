package com.examly.springapp.repository;

import com.examly.springapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {

    // Find all bookings for a given instructor by instructor ID
    List<Booking> findAllByInstructorInstructorId(Long instructorId);

    // Count how many bookings exist for a given session by session ID
    Long countBySessionSessionId(Long sessionId);
    List<Booking> findByUserUserId(Long userId);
    @Query("SELECT b FROM Booking b JOIN FETCH b.session WHERE b.user.userId = :userId")
    List<Booking> findBookingsWithSessionByUserId(@Param("userId") Long userId);
}
