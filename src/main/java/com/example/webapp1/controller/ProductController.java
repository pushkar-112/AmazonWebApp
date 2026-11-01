package com.example.webapp1.controller;
import java.util.*;

import com.example.webapp1.model.Product;
import com.example.webapp1.service.ProductService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping("/products")
    List<Product> getProducts(){
        List<Product> products = productService.getProducts();
        System.out.println("Controller response: " + products);

        return products;
    }

    @RequestMapping("/product/{id}")
    Product getProductById(@PathVariable Integer id){
        return productService.getProductById(id);
    }

    @PostMapping("/addProduct")
    Product addProduct(@RequestBody Product product){
        System.out.println("Controller response: " + product);
        return productService.addProduct(product);
    }

}
