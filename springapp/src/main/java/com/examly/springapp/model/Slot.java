package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @Column(nullable = false)
    private Long instructorId;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private boolean isBooked;
}
