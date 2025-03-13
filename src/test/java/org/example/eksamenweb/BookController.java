package org.example.eksamenweb;

import org.junit.jupiter.api.Test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
class BookController{

    @GetMapping("/date/time")
        public String getCurrentDateTime(){
        LocalDateTime now = LocalDateTime.now();
        return "Current date and time: " + now.toString();
        }
    @GetMapping("/hello")
    public String sayHello(@RequestParam String name){
        return "Hi " + name + " , Welcome to your spring web app";
    }


}