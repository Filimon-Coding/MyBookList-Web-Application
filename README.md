 # MyBookList Web Application

## Description

**MyBookList** is a full-stack web application that allows users to **add**, **view**, and **delete books** in a structured and responsive interface. The system is designed to demonstrate practical skills in **Java (Spring Boot)** for backend API development, **MySQL** for persistent data storage, and **HTML, CSS, JavaScript (Fetch API)** for frontend user interaction.

The application focuses on **real-time communication between frontend and backend**, where books are added and removed dynamically using RESTful APIs without page refresh. 

The backend handles book data using **Spring Data JPA** and exposes endpoints for interaction, while the frontend uses **form validation** and **DOM manipulation** to provide a smooth user experience.

---

## Core Features

- **Add Books**: 
  - Input book details: title, author, genre, year, and short description.
  - Validate all inputs before saving to the database.
  - Automatically refresh the book list after adding.

- **View Book List**: 
  - Display a dynamically updated list of all books stored in the database.
  - Book list is presented in a readable format showing ID, title, author, year, genre, and a short description.

- **Delete Books**:
  - Select a book by ID and remove it from the database.
  - Automatic refresh of the book list after deletion.

---

## Use Case

1. **Add New Book**:
   - The user fills out the book form with required fields and submits.
   - The system validates input and sends data to backend API.
   - Book is stored in MySQL and displayed in the list instantly.

2. **View All Books**:
   - The user clicks "View Data" to display all books stored in the system.
   - The list refreshes dynamically with all current books, ordered by ID.

3. **Delete Book**:
   - The user selects a book ID from a dropdown or input field and clicks "Delete Book".
   - The system removes the book from the database.
   - The updated book list is shown immediately after deletion.

---

## Technologies Used

- **Backend**: Java, Spring Boot, Spring Data JPA
- **Frontend**: HTML, CSS, JavaScript (Fetch API)
- **Database**: MySQL

---

## Example API Endpoints

| Method | Endpoint                | Description             |
|-------|-------------------------|------------------------|
| POST  | `/saveBook`             | Add a new book         |
| GET   | `/getBooks`             | Retrieve all books     |
| DELETE| `/deleteBook/{id}`      | Delete a book by ID    |

---

## Purpose

This project demonstrates **full-stack development** with a focus on:

- **Building REST APIs**
- **Integrating frontend with backend using Fetch API**
- **Database management and data persistence**
- **Form validation and dynamic DOM updates**

It showcases skills valuable for backend development, API integration, and simple frontend solutions without relying on heavy frameworks. The code is written to be clean, maintainable, and easy to extend with future features like book editing and search.
