package com.asa.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.asa.user.UserRepository;
import com.asa.user.models.Product;
import com.asa.user.models.User;

@Service
public class ProductManagement {
  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private UserRepository repository;

  /**************************************************
   * Add To Cart
   ***************************************************/
  public Object addToCart(String userId, Product product) throws NoSuchFieldException, IllegalAccessException {
    Optional<User> optionalUser = repository.findById(userId);
    if (!optionalUser.isPresent())
      return "UserNotFound";
    User user = optionalUser.get();

    String productId = product.getProductId();
    String fetchFieldValueUrl = String.format("http://localhost:5000/product/get-field?productId=%s&fieldName=quantity",
        productId);
    ResponseEntity<String> response = restTemplate.getForEntity(fetchFieldValueUrl, String.class);
    int quantityLeft = Integer.parseInt(response.getBody());

    if (product.getQuantity() > quantityLeft)
      return "QuantityLimitExceeded";
    List<Product> cart = user.getCart();

    int index = -1;
    for (int i = 0; i < cart.size(); i++) {
      if (cart.get(i).getProductId().equals(productId)) {
        index = i;
        break;
      }
    }

    if (index == -1)
      cart.add(product);
    else
      cart.get(index).setQuantity(product.getQuantity());
    user.setCart(cart);
    repository.save(user);
    return cart;
  }
}
