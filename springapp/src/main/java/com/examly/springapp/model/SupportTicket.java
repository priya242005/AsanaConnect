package com.examly.springapp.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Entity to manage support or help tickets raised by users")
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @Schema(description = "User ID who raised the ticket", example = "1001")
    private Long userId;

    @Schema(description = "Brief subject or title of the issue", example = "Unable to book a slot")
    private String subject;

    @Schema(description = "Detailed description of the issue", example = "Whenever I try to book a slot, the payment fails.")
    @Lob
    private String description;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Current status of the ticket")
    private Status status;

    @Schema(description = "Timestamp when ticket was created")
    private LocalDateTime createdAt;

    public enum Status {
        OPEN, IN_PROGRESS, RESOLVED, CLOSED
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = Status.OPEN;
        }
    }
}
