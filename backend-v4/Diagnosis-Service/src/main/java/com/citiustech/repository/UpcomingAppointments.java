package com.citiustech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.model.Upcomingappointments;

@Repository
public interface UpcomingAppointments extends JpaRepository<Upcomingappointments, String> {

}
