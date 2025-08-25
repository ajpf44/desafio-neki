package com.desafioneki.Backend.repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.desafioneki.Backend.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
