package com.examly.springapp.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WellnessTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackerId;

    @Column(nullable = false)
    private Long learnerId;

    private double weight;
    private double height;
    private int sleepHours;
    private int waterIntake; 

    private String mood;

    private LocalDate trackedDate;
}
