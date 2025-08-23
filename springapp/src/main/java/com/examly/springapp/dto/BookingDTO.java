package com.examly.springapp.dto;

public class BookingDTO {
    private Long bookingId;
    private SessionDTO session;

    public BookingDTO() {}

    public BookingDTO(Long bookingId, SessionDTO session) {
        this.bookingId = bookingId;
        this.session = session;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public SessionDTO getSession() { return session; }
    public void setSession(SessionDTO session) { this.session = session; }
}
