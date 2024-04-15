package com.asa.order.models;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
  @Id
  private String productId;
  private String name;
  private float price;
  private int quantity;
  private String image;
  private String description;
  private String[] features;
  private String seller;
}

