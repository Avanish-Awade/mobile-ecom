package com.asa.user.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
  @Id
  private String userId;
  
  private String name;
  private String email;
  private String image = null;
  private String password;
  private List<Product> cart = new ArrayList<Product>();
  private List<String> orders = new ArrayList<String>();
}
