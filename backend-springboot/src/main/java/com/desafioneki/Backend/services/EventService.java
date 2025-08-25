package com.desafioneki.Backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.desafioneki.Backend.dtos.EventCreateDto;
import com.desafioneki.Backend.dtos.EventResponseDto;
import com.desafioneki.Backend.mappers.EventMapper;
import com.desafioneki.Backend.models.Event;
import com.desafioneki.Backend.models.NormalUser;
import com.desafioneki.Backend.repositories.EventRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository repo;
	
	@Autowired
	private NormalUserService userService;

	public List<Event> getAllActiveEvents() {
		Event ev = new Event();
		ev.setActive(true);
		
		Example<Event> example = Example.of(ev);
		List<Event> events = repo.findAll(example);

		return events;
	}

	public Event createEvent(EventCreateDto dto) throws Exception {
		
		NormalUser user = dto.getUserId() != null ? 
				userService.getUserById(dto.getUserId()) : 
				userService.getUserById(1L); //default user id 1
		
		Event event = EventMapper.toModel(dto, user);
		event.setActive(true); //new events are active by default
		
		Event createdEvent = repo.save(event);
		return createdEvent;
	}
	
	public Event getEventById(Long id) throws Exception {
		return repo.findById(id).orElseThrow(() -> new Exception("Event not found"));
	}

	public Event editEvent(Long id, EventCreateDto dto) {
		try {
			Event event = getEventById(id);
			
			event.setTitle(dto.getTitle());
			event.setDate(dto.getDate());
			event.setLocation(dto.getLocation());
			event.setImg(dto.getImg());
			
			 return repo.save(event);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Event not found");
		}		
	}

	public List<Event> getEventsByUserId(Long id) {
		try {
			NormalUser user = userService.getUserById(id);
			
			Event ev = new Event();
			ev.setUser(user);
			
			Example<Event> example = Example.of(ev);
			List<Event> events = repo.findAll(example);
			
			return events;
		} catch (Exception e) {
			throw new RuntimeException("Error fetching events for user");
		}
	}

	public void deleteEventByReference(Long id) throws Exception {
		Event event = this.getEventById(id);
		
		event.setActive(false);
		
		repo.save(event);
	}
}

