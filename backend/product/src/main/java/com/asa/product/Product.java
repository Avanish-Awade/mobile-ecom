package com.asa.product;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="mobiles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
  @Id
  private String productId;
  private String name;
  private String company;
  private float price;
  private int quantity = 0;
  private String image;
  private String seller;
  private String description;
  private String[] features;
}
