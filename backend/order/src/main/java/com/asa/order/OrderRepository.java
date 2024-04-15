package com.asa.order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.asa.order.models.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String>{
  
}
