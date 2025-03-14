document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM lastet!");

    // Henter elementene fra HTML
    const nameInnput = document.getElementById("nameID");
    const authorInnput = document.getElementById("authorID");
    const descriptionInnput = document.getElementById("descriptionID");
    const generSelect = document.getElementById("genreID");
    const yearInnput = document.getElementById("yearID");
    const message = document.getElementById("message");
    const submitbutton = document.getElementById("submitID");

    // Validering av input
    function validateForm() {
        const name = nameInnput.value.trim();
        const author = authorInnput.value.trim();
        const description = descriptionInnput.value.trim();
        const genre = generSelect.value.trim();
        const year = yearInnput.value.trim();

        // Sjekker om noen felt er tomme
        if (name === "" || author === "" || description === "" || genre === "" || year === "") {
            message.textContent = "You must fill out all fields!";
            message.style.color = "Red";
            return false;
        }
        if (name === ""){
            message.textContent = "The name field must be filled"
            message.style.color = "Red";
            return false;
        }else if (author === ""){
            message.textContent = "The author field must be filled";
            message.style.color = "Red";
            return false;
        }else if (description === ""){
            message.textContent = "The description field must be filled";
            message.style.color = "Red";
            return false;
        }

        // Sjekker at årstall er et gyldig år (fire sifre)
        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(year)) {
            message.textContent = "Please enter a valid 4-digit year!";
            message.style.color = "Red";
            return false;
        }
        // Alt ok
        return true;
    }

    // Sender bok til backend
    function collectAndSendBook(event) {
        event.preventDefault(); // Hindrer refresh

        if (!validateForm()) {
            console.log("Validering feilet. Avbryter sending.");
            return;
        }

        // Lager bok-objekt
        const book = {
            name: nameInnput.value.trim(),
            author: authorInnput.value.trim(),
            description: descriptionInnput.value.trim(),
            genre: generSelect.value.trim(),
            year: yearInnput.value.trim()
        };

        console.log("Sender bok til backend:", book);

        // Sender med fetch til backend
        fetch('http://localhost:8080/saveBook', { // Husk riktig port!
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        })
            .then(response => {
                if (response.ok) {
                    message.textContent = "Book was successfully saved!";
                    message.style.color = "Green";
                    getBooks(); // Oppdaterer liste
                } else {
                    message.textContent = "Failed to save book. Please try again.";
                    message.style.color = "Red";
                }
            })
            .catch(error => {
                console.error("Error while sending book:", error);
                message.textContent = "An error occurred while sending the book.";
                message.style.color = "Red";
            });
    }

    //  Henter og viser bøkene
    function getBooks() {
        fetch('http://localhost:8080/getBooks') // Husk riktig port!
            .then(response => response.json())
            .then(data => {
                console.log("Fetched books:", data);
                let output = "<h2>Book List</h2><ul>";
                data.forEach(book => {
                    output += `<li>${book.name} by ${book.author} (${book.year}) - ${book.genre}</li>`;
                });
                output += "</ul>";
                message.innerHTML = output; // Viser listen
            })
            .catch(error => console.error('Error fetching books:', error));
    }
    const resetButton = document.getElementById("resetButton");

    if (resetButton && nameInnput && authorInnput && descriptionInnput && generSelect && yearInnput) {
        resetButton.addEventListener("click", function() {
            nameInnput.value = "";
            authorInnput.value = "";
            descriptionInnput.value="";
            generSelect.value = "";
            yearInnput.value = "";

        });
    }



    //  Koble submit-knappen til send-funksjonen
    submitbutton.addEventListener("click", collectAndSendBook);


    //  Hent bøker når siden lastes
    getBooks();
});
