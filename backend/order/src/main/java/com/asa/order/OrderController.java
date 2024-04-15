package com.asa.order;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asa.order.models.Order;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/order")
public class OrderController {
  @Autowired
  private OrderService orderService;

  @GetMapping("/get")
  public ResponseEntity<Object> getOrder(@RequestParam String orderId) {
    Object response = orderService.getOrder(orderId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  ResponseEntity<Object> createOrder(@RequestBody Map<String, Object> req) {
    String userId = (String) req.get("userId");
    ObjectMapper mapper = new ObjectMapper();
    Order order = mapper.convertValue(req.get("order"), Order.class);
    Object response = orderService.createOrder(order, userId);
    return ResponseEntity.ok(response);
  }

}
