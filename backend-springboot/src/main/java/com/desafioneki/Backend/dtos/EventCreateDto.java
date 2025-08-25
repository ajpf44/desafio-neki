package com.desafioneki.Backend.dtos;

import java.time.LocalDate;

public class EventCreateDto {

	private String title;
	private String location;
	private LocalDate date;
	private String img;
	private Long userId;
	
	public EventCreateDto( String title, String location, LocalDate date, String img, Long userId) {
		super();
		this.title = title;
		this.location = location;
		this.date = date;
		this.img = img;
		this.userId = userId;
	}
	
	public EventCreateDto() {}
	
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
