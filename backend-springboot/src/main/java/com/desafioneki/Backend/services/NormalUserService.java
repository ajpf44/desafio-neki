package com.desafioneki.Backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.desafioneki.Backend.dtos.UserCreateDto;
import com.desafioneki.Backend.dtos.LoginDto;
import com.desafioneki.Backend.models.NormalUser;
import com.desafioneki.Backend.repositories.NormalUserRepository;

@Service
public class NormalUserService {
	
	@Autowired
	private NormalUserRepository repo;
	
	public NormalUser createUser(UserCreateDto dto) {
		NormalUser user = new NormalUser();
		
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		
		repo.save(user);
		
		return user;
	}

	public NormalUser login(LoginDto dto) throws Exception {
		NormalUser user = new NormalUser();
		user.setEmail(dto.getEmail());
		
		Example<NormalUser> example = Example.of(user);
		Optional<NormalUser> optUser = repo.findOne(example);
		
		if(optUser.isEmpty()) {
			throw new Exception("User not found");
		}
		
		if(!optUser.get().getPassword().equals(dto.getPassword())) {
			throw new Exception("Invalid password");
		}
		return optUser.get(); 
	}
	
	public NormalUser getUserById(Long id) throws Exception {
		Optional<NormalUser> optUser = repo.findById(id);
		
		if(optUser.isEmpty()) {
			throw new Exception("User not found");
		}
		
		return optUser.get();
	}
}
