package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emotionId;

    @Column(nullable = false)
    private Long learnerId;

    @NotBlank(message = "Emotion type cannot be blank")
    private String emotionType;

    @Column(nullable = false)
    private LocalDate date;

    private String notes;
}
