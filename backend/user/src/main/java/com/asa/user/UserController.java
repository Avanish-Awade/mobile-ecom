package com.asa.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asa.user.models.Product;
import com.asa.user.models.User;
import com.asa.user.response.UserCreationResponse;
import com.asa.user.response.UserEditResponse;
import com.asa.user.services.Auth;
import com.asa.user.services.OrderManagement;
import com.asa.user.services.ProductManagement;
import com.asa.user.services.UserManagement;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  private Auth auth;
  @Autowired
  private OrderManagement orderManagement;
  @Autowired
  private ProductManagement productManagement;
  @Autowired
  private UserManagement userManagement;


  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody User user) {
    Object response = auth.login(user);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  public ResponseEntity<UserCreationResponse> createUser(@RequestBody User user) {
    String userId = auth.createUser(user);
    UserCreationResponse response = new UserCreationResponse("New user created successfully", userId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/edit")
  public ResponseEntity<UserEditResponse> updateUser(@RequestBody User user) {
    String userId = user.getUserId();
    User editedUser = userManagement.editUser(userId, user);
    UserEditResponse response = new UserEditResponse("User updated successfully", editedUser);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteUser(@RequestParam String userId) {
    boolean result = userManagement.deleteUser(userId);
    if (result == true)
      return ResponseEntity.ok(String.format("User %s deleted successfully", userId));
    else
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user " + userId);
  }

  @PostMapping("/add-to-cart")
  public ResponseEntity<Object> addToCart(@RequestBody Map<String, Object> req)
      throws NoSuchFieldException, IllegalAccessException {
    String userId = (String) req.get("userId");
    ObjectMapper mapper = new ObjectMapper();
    Product product = mapper.convertValue(req.get("product"), Product.class);
    Object response = productManagement.addToCart(userId, product);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/place-order")
  public ResponseEntity<Object> placeOrder(@RequestBody Map<String, Object> req){
    String userId = (String) req.get("userId");
    ObjectMapper mapper = new ObjectMapper();
    Object order = mapper.convertValue(req.get("order"), Object.class);
    Object response = orderManagement.placeOrder(order, userId);
    return ResponseEntity.ok(response);
  }
}
