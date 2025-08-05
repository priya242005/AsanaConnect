package com.examly.springapp.repository;

import com.examly.springapp.model.LoyaltyTier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoyaltyTierRepository extends JpaRepository<LoyaltyTier, Long> {
}
