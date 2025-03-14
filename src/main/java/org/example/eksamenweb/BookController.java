package org.example.eksamenweb;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
public class BookController {

    @GetMapping("/date/time")
    public String getCurrentDateTime() {
        return "Current date and time: " + LocalDateTime.now();
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam String name) {
        return "Hi " + name + ", welcome to your Spring web app!";
    }
    @PostMapping("/saveBook")
    public String saveBook(@RequestBody Book book) {
        System.out.println("Received book: " + book);
        return "Book saved!";
    }
}
