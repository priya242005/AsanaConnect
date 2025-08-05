package com.examly.springapp.service;

import com.examly.springapp.model.LoyaltyTier;
import com.examly.springapp.repository.LoyaltyTierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoyaltyTierService {

    @Autowired
    private LoyaltyTierRepository repo;

    public LoyaltyTier addTier(LoyaltyTier tier) {
        return repo.save(tier);
    }

    public List<LoyaltyTier> getAllTiers() {
        return repo.findAll();
    }

    public LoyaltyTier getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public LoyaltyTier updateTier(Long id, LoyaltyTier updated) {
        LoyaltyTier existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setTierName(updated.getTierName());
            existing.setMinPoints(updated.getMinPoints());
            existing.setMaxPoints(updated.getMaxPoints());
            existing.setDiscountPercentage(updated.getDiscountPercentage());
            return repo.save(existing);
        }
        return null;
    }

    public boolean deleteTier(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
