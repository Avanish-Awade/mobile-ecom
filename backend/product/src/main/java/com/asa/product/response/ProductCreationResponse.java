package com.asa.product.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductCreationResponse {
  private String message;
  private String productId;
}