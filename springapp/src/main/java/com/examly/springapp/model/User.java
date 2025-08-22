package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User details")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique user ID")
    private Long userId;

    @NotBlank(message = "User name is required")
    @Schema(description = "User name")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(unique = true)
    @Schema(description = "User email")
    private String email;

    @NotBlank(message = "Password is required")
    @Schema(description = "User password")
    private String password;

    @Schema(description = "User role/type")
    private String role = "USER";  // default

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("user-booking")
    private List<Booking> bookings;
}
