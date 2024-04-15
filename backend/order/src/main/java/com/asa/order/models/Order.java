package com.asa.order.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
  @Id
  String orderId;
  String userId ;
  long timeStamp;
  List<CartProduct> products = new ArrayList<CartProduct>();
  float totalCost;
}
