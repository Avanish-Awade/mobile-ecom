package com.asa.user;

import java.util.Optional;

// import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.asa.user.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
  Optional<User> findByEmail(String email);
}
