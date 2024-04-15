package com.asa.order;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.asa.order.models.Order;
import com.asa.order.models.Product;
import com.asa.order.models.CartProduct;

@Service
public class OrderService {
  @Autowired
  private OrderRepository repository;

  /**************************************************
   * Get Order Data
   ***************************************************/
  public Object getOrder(String orderId) {
    Optional<Order> optionalOrder = repository.findById(orderId);
    if (!optionalOrder.isPresent())
      return "OrderNotFound";
    Order order = optionalOrder.get();
    return order;
  }

  /**************************************************
   * Create Order
   ***************************************************/
  public Object createOrder(Order order, String userId) {
    order.setTimeStamp(getTime());
    order.setUserId(userId);
    System.out.println("------------<><><><><><");
    Order orderCreated = repository.save(order);

    List<CartProduct> cart = order.getProducts();
    for (CartProduct cp : cart) {
      changeQuantity(cp);
    }

    String orderId = orderCreated.getOrderId();
    return orderId;
  }

  // ---------- Get Time ----------------
  private long getTime() {
    Instant instant = Instant.now();
    ZoneOffset gmtOffset = ZoneOffset.UTC;
    OffsetDateTime gmtTime = instant.atOffset(gmtOffset);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    String formattedGmtTime = gmtTime.format(formatter);
    return Long.parseLong(formattedGmtTime);
  }

  // ---------- Change the available quantity of product -----------
  private void changeQuantity(CartProduct cp) {
    RestTemplate restTemplate = new RestTemplate();
    String getProductUrl = "http://localhost:5000/product/get?productId=" + cp.getProductId();
    ResponseEntity<Product> response = restTemplate.getForEntity(getProductUrl, Product.class);
    Product product = response.getBody();
    product.setQuantity(product.getQuantity() - cp.getQuantity());

    String editProductUrl = "http://localhost:5000/product/edit";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> req = new HttpEntity<>(product, headers);
    restTemplate.postForEntity(editProductUrl, req, Object.class);
  }
}
