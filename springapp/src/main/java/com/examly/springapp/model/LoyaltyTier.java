package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoyaltyTier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String tierName;

    @Column(nullable = false)
    private int minPoints;

    @Column(nullable = false)
    private int maxPoints;

    @Column(nullable = false)
    private double discountPercentage;
}
