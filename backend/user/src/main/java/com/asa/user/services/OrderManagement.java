package com.asa.user.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.asa.user.UserRepository;
import com.asa.user.models.OrderRequest;
import com.asa.user.models.Product;
import com.asa.user.models.User;

@Service
public class OrderManagement {
  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private UserRepository repository;

  /**************************************************
   * Place Order
   ***************************************************/
  public Object placeOrder(Object order, String userId) {
    // find user
    Optional<User> existingUser = repository.findById(userId);
    if(!existingUser.isPresent()) return "UserNotFound";
    User user = existingUser.get();
    System.out.println("-----<><><><><><><><>----");
    System.out.println(order);
    System.out.println(userId);

    // create order request
    OrderRequest orderRequest = new OrderRequest(order, userId);
    String placeOrderUrl = "http://localhost:5000/order/create";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> req = new HttpEntity<>(orderRequest, headers);
    ResponseEntity<String> res = restTemplate.postForEntity(placeOrderUrl, req, String.class);
    
    // check response
    String orderId = res.getBody();
    if(orderId == "QuantityLimitExceeded") return "OrderError";

    // add order to user data
    List<String> orderList = user.getOrders();
    orderList.add(orderId);
    user.setOrders(orderList);
    user.setCart(new ArrayList<Product>());
    repository.save(user);

    return user;
  }
}
