package com.asa.user.response;

import com.asa.user.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserEditResponse {
  private String message;
  private User editedUser;
}
