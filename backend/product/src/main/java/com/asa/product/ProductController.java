package com.asa.product;

import java.util.List;

// spring boot imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asa.product.response.ProductCreationResponse;
import com.asa.product.response.ProductEditResponse;

@RestController
@RequestMapping("/product")
public class ProductController {
  @Autowired
  private ProductService productService;

  @GetMapping("")
  public ResponseEntity<List<Product>> getProducts(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false) String[] companies,
      @RequestParam(required = false) Float lowerPrice,
      @RequestParam(required = false) Float upperPrice) {

    List<Product> productList = productService.filterProducts(name, companies, lowerPrice, upperPrice);
    return ResponseEntity.ok(productList);
  }

  @GetMapping("/get")
  public ResponseEntity<Object> getProduct(@RequestParam String productId){
    Object response = productService.getProduct(productId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  public ResponseEntity<ProductCreationResponse> createProduct(@RequestBody Product product) {
    String productId = productService.createProduct(product);
    ProductCreationResponse response = new ProductCreationResponse("New product created successfully", productId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/edit")
  public ResponseEntity<ProductEditResponse> updateProduct(@RequestBody Product product) {
    String productId = product.getProductId();
    Product editedProduct = productService.editProduct(productId, product);
    ProductEditResponse response = new ProductEditResponse("Product updated successfully", editedProduct);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteProduct(@RequestParam String productId) {
    boolean result = productService.deleteProduct(productId);
    if (result == true)
      return ResponseEntity.ok(String.format("Product %s deleted successfully", productId));
    else
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting product " + productId);
  }

  @GetMapping("get-field")
  public ResponseEntity<Object> getFieldData(@RequestParam String productId, @RequestParam String fieldName)
      throws NoSuchFieldException, IllegalAccessException {
    Object fieldValue = productService.getFieldData(productId, fieldName);
    return ResponseEntity.ok(fieldValue);
  }
}