package com.desafioneki.Backend.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String location;
	private LocalDate date;
	//could be a URL or base64 string
	@Lob
	private String img;
	
	private Boolean active;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private NormalUser user;
	
	public Event(Long id, String title, String location, LocalDate date, String img, Boolean active, NormalUser user) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.date = date;
		this.img = img;
		this.active = active;
		this.user = user;
	}

	public Event() {}

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

	public NormalUser getUser() {
		return user;
	}

	public void setUser(NormalUser user) {
		this.user = user;
	}	
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
}
