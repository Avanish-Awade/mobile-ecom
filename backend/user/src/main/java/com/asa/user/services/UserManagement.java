package com.asa.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asa.user.UserRepository;
import com.asa.user.models.User;

import jakarta.ws.rs.NotFoundException;

@Service
public class UserManagement {
  @Autowired
  private UserRepository repository;

    /**************************************************
   * Edit User
   ***************************************************/
  public User editUser(String userId, User updatedUserData) {
    // Retrieve the existing user from the database
    User existingUser = repository.findById(userId).orElse(null);

    if (existingUser != null) {
      // Update the fields of the existing user with the new data
      existingUser.setName(updatedUserData.getName());
      existingUser.setEmail(updatedUserData.getEmail());
      existingUser.setImage(updatedUserData.getImage());

      // Save the modified user back to the database
      return repository.save(existingUser);
    } else {
      // Handle the case where the user with the given ID is not found
      throw new NotFoundException("User not found with ID: " + userId);
    }
  }

  /**************************************************
   * Delete User
   ***************************************************/
  public boolean deleteUser(String userId) {
    // Retrieve the existing user from the database
    User existingUser = repository.findById(userId).orElse(null);
    if (existingUser != null) {
      repository.delete(existingUser);
      return true;
    } else {
      throw new NotFoundException("User not found with ID: " + userId);
    }
  }
}
