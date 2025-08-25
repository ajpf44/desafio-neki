package com.desafioneki.Backend.mappers;

import com.desafioneki.Backend.dtos.EventCreateDto;
import com.desafioneki.Backend.dtos.EventResponseDto;
import com.desafioneki.Backend.models.Event;
import com.desafioneki.Backend.models.NormalUser;

public class EventMapper {
	
	public static EventResponseDto toResponseDto(Event event) {
		EventResponseDto dto = new EventResponseDto();
		dto.setId(event.getId());
		dto.setTitle(event.getTitle());
		dto.setDate(event.getDate());
		dto.setLocation(event.getLocation());
		dto.setImg(event.getImg());
		dto.setUserDto(UserMapper.toResponseDto(event.getUser()));
		
		return dto;
	}
	public static Event toModel(EventCreateDto dto, NormalUser user) {
		Event event = new Event();
		
		event.setTitle(dto.getTitle());
		event.setDate(dto.getDate());
		event.setLocation(dto.getLocation());
		event.setImg(dto.getImg());
		event.setUser(user);
		
		return event;
	}
}
