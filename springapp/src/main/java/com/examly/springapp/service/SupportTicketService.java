package com.examly.springapp.service;

import com.examly.springapp.model.SupportTicket;
import com.examly.springapp.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SupportTicketService {

    @Autowired
    private SupportTicketRepository repo;

    public SupportTicket createTicket(SupportTicket ticket) {
        return repo.save(ticket);
    }

    public List<SupportTicket> getAllTickets() {
        return repo.findAll();
    }

    public SupportTicket getTicketById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<SupportTicket> getTicketsByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    public SupportTicket updateTicket(Long id, SupportTicket updated) {
        return repo.findById(id).map(ticket -> {
            ticket.setSubject(updated.getSubject());
            ticket.setDescription(updated.getDescription());
            ticket.setStatus(updated.getStatus());
            return repo.save(ticket);
        }).orElse(null);
    }

    public boolean deleteTicket(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
