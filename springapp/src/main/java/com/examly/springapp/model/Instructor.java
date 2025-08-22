package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Instructor-specific details")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique instructor ID")
    private Long instructorId;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Certification cannot be empty")
    private String certification;

    private String yogaSpecialty;

    private String classPreference;

    @Schema(description = "Phone number of instructor")
    private String phoneNumber;

    @Schema(description = "Years of teaching experience")
    private int experienceYears;

    @ElementCollection
    @Schema(description = "Yoga styles offered by the instructor")
    private List<String> stylesOffered;

    @Schema(description = "Base hourly rate set by the instructor")
    private double hourlyRate;

    @Schema(description = "Link to intro video")
    private String introVideoUrl;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Gender of the instructor")
    private Gender gender;

    @NotBlank(message = "Password is required")
    @Schema(description = "Password for instructor login")
    private String password;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("instructor-session")
    private List<Session> sessions;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("instructor-booking")
    private List<Booking> bookings;

    public enum Gender {
        MALE, FEMALE, OTHER
    }
}
