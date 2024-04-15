package com.asa.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreationResponse {
  private String message;
  private String productId;
}
