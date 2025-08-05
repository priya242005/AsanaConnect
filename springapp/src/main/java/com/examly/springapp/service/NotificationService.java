package com.examly.springapp.service;

import com.examly.springapp.model.Notification;
import com.examly.springapp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    public Notification sendNotification(Notification notification) {
        notification.setTimestamp(LocalDateTime.now());
        notification.setReadStatus(false);
        return repo.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return repo.findAll();
    }

    public Notification getNotificationById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Notification> getNotificationsByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public Notification markAsRead(Long id) {
        Notification note = repo.findById(id).orElse(null);
        if (note != null) {
            note.setReadStatus(true);
            return repo.save(note);
        }
        return null;
    }

    public boolean deleteNotification(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
