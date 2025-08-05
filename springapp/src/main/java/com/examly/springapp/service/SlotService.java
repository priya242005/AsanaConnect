package com.examly.springapp.service;

import com.examly.springapp.model.Slot;
import com.examly.springapp.repository.SlotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepo slotRepo;

    public Slot addSlot(Slot slot) {
        return slotRepo.save(slot);
    }

    public List<Slot> getAllSlots() {
        return slotRepo.findAll();
    }

    public Slot getSlotById(Long id) {
        return slotRepo.findById(id).orElse(null);
    }

    public List<Slot> getSlotsByInstructor(Long instructorId) {
        return slotRepo.findByInstructorId(instructorId);
    }

    public Slot updateSlot(Long id, Slot updated) {
        Slot existing = slotRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setStartTime(updated.getStartTime());
            existing.setEndTime(updated.getEndTime());
            existing.setAvailable(updated.isAvailable());
            return slotRepo.save(existing);
        }
        return null;
    }

    public boolean deleteSlot(Long id) {
        if (slotRepo.existsById(id)) {
            slotRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
