package com.examly.springapp.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @Column(nullable = false)
    private Long learnerId;

    @Column(nullable = false)
    private Long instructorId;

    @Column(nullable = false)
    private Long slotId;

    @Column(nullable = false)
    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    public enum SessionStatus {
        CONFIRMED,
        CANCELLED,
        COMPLETED,
        RESCHEDULED
    }
}
