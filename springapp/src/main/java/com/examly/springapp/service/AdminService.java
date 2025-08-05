package com.examly.springapp.service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepository;

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        updatedAdmin.setId(id);
        return adminRepository.save(updatedAdmin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
