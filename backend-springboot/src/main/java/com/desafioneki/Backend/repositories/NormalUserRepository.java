package com.desafioneki.Backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desafioneki.Backend.models.NormalUser;

public interface NormalUserRepository extends JpaRepository<NormalUser, Long> {

}
