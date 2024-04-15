package com.asa.product.response;

import com.asa.product.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductEditResponse {
  private String message;
  private Product editedProduct;
}
