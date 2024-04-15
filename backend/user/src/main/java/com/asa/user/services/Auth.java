package com.asa.user.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.asa.user.UserRepository;
import com.asa.user.models.User;

@Service
public class Auth {
  private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  @Autowired
  private UserRepository repository;

  /**************************************************
   * Login
   ***************************************************/
  public Object login(User user) {
    Optional<User> optionalUser = repository.findByEmail(user.getEmail());
    if(!optionalUser.isPresent()) return "InvalidCredentials";
    User existingUser = optionalUser.get();
    boolean passwordMatches = encoder.matches(user.getPassword(), existingUser.getPassword());
    if (!passwordMatches)
      return "InvalidCredentials";
    existingUser.setPassword(null);
    return existingUser;
  }

  /**************************************************
   * Create Users
   ***************************************************/
  public String createUser(User user) {
    Optional<User> optionalUser = repository.findByEmail(user.getEmail());
    if(optionalUser.isPresent()) return "UserFound";
    
    String encodedPassword = encoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    
    User savedUser = repository.save(user);
    String userId = savedUser.getUserId();
    return userId;
  }
}
