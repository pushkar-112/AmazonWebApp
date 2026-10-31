package com.example.webapp1.controller;

import com.example.webapp1.TestClass;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HomeController {

    TestClass tc1  = new TestClass("testVal1", "testVal2");

    @RequestMapping("/home")
    public String greet(){
        return "Hello, Welcome to the webapp";
    }

    @RequestMapping("/home/test")
    public TestClass test(){
        return tc1;
    }

    // For react app testing
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }


}
