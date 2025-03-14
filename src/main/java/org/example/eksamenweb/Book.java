package org.example.eksamenweb;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Gjør at denne klassen blir en tabell i MySQL
public class Book {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatisk ID
    private Long id;

    private String name;
    private String author;
    private String description;
    private String genre;
    private String year;

    // Getters og Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
}
