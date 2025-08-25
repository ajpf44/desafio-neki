package com.desafioneki.Backend.dtos;

import java.time.LocalDate;

public class EventResponseDto {
	private Long id;
	private String title;
	private String location;
	private LocalDate date;
	private String img;
	private UserResponseDto user;

	public EventResponseDto(Long id, String title, String location, LocalDate date, String img,
			UserResponseDto userDto) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.date = date;
		this.img = img;
		this.user = userDto;
	}
	public EventResponseDto() {}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public UserResponseDto getUserDto() {
		return user;
	}
	public void setUserDto(UserResponseDto userDto) {
		this.user = userDto;
	}
	
}
