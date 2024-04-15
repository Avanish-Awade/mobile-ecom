package com.asa.product;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

// spring boot imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

// mongo imports
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Service;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import jakarta.ws.rs.NotFoundException;

@Service
public class ProductService {
  @Autowired
  private ProductRepository repository;

  @Autowired
  private MongoClient client;

  @Autowired
  private MongoConverter convertor;

  @Autowired
  private Environment environment;

  /**************************************************
   * Fetch products by applying filter
   ***************************************************/
  public List<Product> filterProducts(String name, String[] companies, Float lowerPrice, Float upperPrice) {
    // get collection object
    String databaseName = environment.getProperty("spring.data.mongodb.database");
    MongoDatabase database = client.getDatabase(databaseName);
    MongoCollection<Document> collection = database.getCollection("mobiles");

    System.out.println("---------<><><><><><><><>--------");
    if (lowerPrice == null)
      lowerPrice = 0.0f;
    if (upperPrice == null)
      upperPrice = 99999999.9f;

    // configure filters
    String nameRegex = String.format("(?i).*%s.*", name);
    Bson nameFilter = Filters.regex("name", nameRegex);
    Bson priceFilter = Filters.and(Filters.gt("price", lowerPrice), Filters.lt("price", upperPrice));

    Bson filter = Filters.and(nameFilter, priceFilter);

    if (companies != null && companies.length > 0) {
      // make case insensitive check for companies
      List<Bson> companyFilters = new ArrayList<>();
      for (String company : companies) {
        companyFilters.add(Filters.regex("company", Pattern.compile(company, Pattern.CASE_INSENSITIVE)));
      }
      Bson finalCompanyFilter = Filters.or(companyFilters);
      filter = Filters.and(filter, finalCompanyFilter);
    }

    // search based on filter and store in a list
    List<Product> productList = new ArrayList<Product>();
    FindIterable<Document> productDocs = collection.find(filter);

    productDocs.forEach(product -> productList.add(convertor.read(Product.class, product)));
    return productList;
  }

  /**************************************************
   * Get Product Data
   ***************************************************/
  public Object getProduct(String productId){
    Optional<Product> existingProduct = repository.findById(productId);
    if(!existingProduct.isPresent()) return "ProductNotFound";
    return existingProduct.get();
  }

  /**************************************************
   * Create Products
   ***************************************************/
  public String createProduct(Product product) {
    Product savedProduct = repository.save(product);
    String productId = savedProduct.getProductId();
    return productId;
  }

  /**************************************************
   * Edit Product
   ***************************************************/
  public Product editProduct(String productId, Product updatedProductData) {
    // Retrieve the existing product from the database
    Product existingProduct = repository.findById(productId).orElse(null);

    if (existingProduct != null) {
      // Update the fields of the existing product with the new data
      existingProduct.setName(updatedProductData.getName());
      existingProduct.setPrice(updatedProductData.getPrice());
      existingProduct.setImage(updatedProductData.getImage());
      existingProduct.setSeller(updatedProductData.getSeller());
      existingProduct.setDescription(updatedProductData.getDescription());
      existingProduct.setFeatures(updatedProductData.getFeatures());
      existingProduct.setQuantity(updatedProductData.getQuantity());

      // Save the modified product back to the database
      return repository.save(existingProduct);
    } else {
      // Handle the case where the product with the given ID is not found
      throw new NotFoundException("Product not found with ID: " + productId);
    }
  }

  /**************************************************
   * Delete Product
   ***************************************************/
  public boolean deleteProduct(String productId) {
    // Retrieve the existing product from the database
    Product existingProduct = repository.findById(productId).orElse(null);
    if (existingProduct != null) {
      repository.delete(existingProduct);
      return true;
    } else {
      throw new NotFoundException("Product not found with ID: " + productId);
    }
  }

  /**************************************************
   * Get Product Field Data
   ***************************************************/
  public Object getFieldData(String productId, String fieldName) throws NoSuchFieldException, IllegalAccessException{
    Optional<Product> optionalProduct = repository.findById(productId);
    if(!optionalProduct.isPresent()) return "Product doesn't exist";
    Product product = optionalProduct.get();
    Field field = product.getClass().getDeclaredField(fieldName);
    field.setAccessible(true);
    return field.get(product);
  }
}
