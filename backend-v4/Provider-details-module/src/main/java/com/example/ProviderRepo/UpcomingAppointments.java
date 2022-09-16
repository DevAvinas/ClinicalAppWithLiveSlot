package com.example.ProviderRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ProviderModel.Upcomingappointments;

@Repository
public interface UpcomingAppointments extends JpaRepository<Upcomingappointments,String>  {

}
