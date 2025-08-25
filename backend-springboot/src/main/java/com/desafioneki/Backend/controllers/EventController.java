package com.desafioneki.Backend.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafioneki.Backend.dtos.EventCreateDto;
import com.desafioneki.Backend.dtos.EventResponseDto;
import com.desafioneki.Backend.mappers.EventMapper;
import com.desafioneki.Backend.models.Event;
import com.desafioneki.Backend.services.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventController {

	
	@Autowired
	private EventService serv;
	
	@GetMapping()
	public ResponseEntity<Object> getAllActiveEvents() {
						     
	    List<Event> events = serv.getAllActiveEvents();
	    
	    List<EventResponseDto> eventDtos = events.stream()
	    		.map(EventMapper::toResponseDto)
	    		.toList();
	    
	    return ResponseEntity.ok().body(eventDtos);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<Object> getEventsByUserId(@PathVariable Long userId) {
	    try {
			List<Event> eventsFromUser = serv.getEventsByUserId(userId);
			List<EventResponseDto> responseDto = eventsFromUser.stream()
					.map(EventMapper::toResponseDto)
					.toList();
			
			return ResponseEntity.status(HttpStatus.OK).body(responseDto);
		} catch (Exception e) {
			e.printStackTrace();
			
			Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", e.getMessage());
	        return ResponseEntity.status(401).body(errorResponse);
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createEvent(@RequestBody EventCreateDto dto) {
	    Event createdEvent;
		try {
			createdEvent = serv.createEvent(dto);
			EventResponseDto responseDto = EventMapper.toResponseDto(createdEvent);
			return ResponseEntity.status(201).body(responseDto);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", e.getMessage());
	        return ResponseEntity.status(401).body(errorResponse);
		}
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Object> updateEvent(@PathVariable Long id, @RequestBody EventCreateDto dto) {
	    try {
			Event editedEvent = serv.editEvent(id, dto);
			EventResponseDto responseDto = EventMapper.toResponseDto(editedEvent);
			
			return ResponseEntity.status(HttpStatus.OK).body(responseDto);
		} catch (Exception e) {
			e.printStackTrace();
			
			Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", e.getMessage());
	        return ResponseEntity.status(401).body(errorResponse);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteEvent(@PathVariable Long id) {
	    try {
			serv.deleteEventByReference(id);
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			
			Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", e.getMessage());
	        return ResponseEntity.status(401).body(errorResponse);
		}
	}
}
