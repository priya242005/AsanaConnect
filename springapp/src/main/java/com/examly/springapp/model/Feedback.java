package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @NotNull
    private Long learnerId;

    @NotNull
    private Long instructorId;

    @Min(1)
    @Max(5)
    private int rating;

    @Column(length = 500)
    private String comments;
}
