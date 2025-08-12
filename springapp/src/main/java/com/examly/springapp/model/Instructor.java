package com.examly.springapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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

    public enum Gender {
        MALE, FEMALE, OTHER
    }
}
 