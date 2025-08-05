package com.examly.springapp.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Learner details for yoga classes")
public class Learner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Learner ID")
    private Long id;

    @Schema(description = "Full name of the learner")
    private String name;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Gender of the learner")
    private Gender gender;

    @Schema(description = "Email address")
    private String email;

    @Schema(description = "Phone number")
    private String phone;

    @Schema(description = "Encrypted password")
    private String passwordHash;

    @Schema(description = "Learner's preferred class mode (online/offline)")
    private String classModePreference;

    @Schema(description = "Wellness goal of the learner (e.g. stress relief, flexibility)")
    private String wellnessGoal;

    public enum Gender {
        MALE, FEMALE, OTHER
    }
}
