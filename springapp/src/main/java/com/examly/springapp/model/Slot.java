package com.examly.springapp.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    private Long instructorId;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private boolean isAvailable;

    public void setBooked(boolean available) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setBooked'");
    }
}
