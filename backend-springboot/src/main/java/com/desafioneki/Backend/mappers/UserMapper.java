package com.desafioneki.Backend.mappers;

import com.desafioneki.Backend.dtos.UserResponseDto;
import com.desafioneki.Backend.models.NormalUser;

public class UserMapper {

	public static UserResponseDto toResponseDto(NormalUser user) {
		UserResponseDto dto = new UserResponseDto();
		dto.setId(user.getId());
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		
		return dto;
	}
}
