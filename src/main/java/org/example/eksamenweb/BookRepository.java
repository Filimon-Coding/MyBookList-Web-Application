package org.example.eksamenweb;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    // Du får metoder som save(), findAll(), deleteById(), etc.
}
