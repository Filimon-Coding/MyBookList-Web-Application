document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM lastet!");

    // Henter elementene fra HTML
    const nameInnput = document.getElementById("nameID");
    const authorInnput = document.getElementById("authorID");
    const descriptionInnput = document.getElementById("descriptionID");
    const generSelect = document.getElementById("genreID");
    const yearInnput = document.getElementById("yearID");
    const message = document.getElementById("message");
    const dataMessage = document.getElementById("dataMessage");
    const submitbutton = document.getElementById("submitID");
    const deletebutton = document.getElementById("deletebuttonID");
    const viewDataButton = document.getElementById("viewDataID");

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
// alt ok
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
                    nameInnput.value = "";
                    authorInnput.value = "";
                    descriptionInnput.value="";
                    generSelect.value = "";
                    yearInnput.value = "";
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
                    output += `<li> ID : ${book.id} :-   ${book.name} by ${book.author} (${book.year}) - ${book.genre} -  About  - ${book.description}</li>`;
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
    /*

    function viewData(){
        fetch('http://localhost:8080/getBooks') // Husk riktig port!
            .then(response => response.json())
            .then(data => {
                console.log("Fetched books:", data);
                let output = "<h2>Book List</h2><ul>";
                data.forEach(book => {
                    output += `<li> ID : ${book.id} :-   ${book.name} by ${book.author} (${book.year}) - ${book.genre}   About  - ${book.description}</li>`;
                });
                output += "</ul>";
                dataMessage.innerHTML = output; // Viser listen
            })
            .catch(error => console.error('Error fetching books:', error));
    }

     */

    function viewData() {
        fetch('http://localhost:8080/getBooks')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched books:", data);

                let output = `
                <h2> Book List</h2>
                <table class="book-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

                data.forEach(book => {
                    output += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.year}</td>
                        <td>${book.genre}</td>
                        <td>${book.description}</td>
                    </tr>
                `;
                });

                output += `
                    </tbody>
                </table>
            `;

                dataMessage.innerHTML = output;
            })
            .catch(error => console.error('Error fetching books:', error));
    }


    function deleteBook(){
        const bookID = document.getElementById("deleteID").value.trim();

        if(!bookID){
            message.textContent = "Det finnes ikke bok med denne ID nr";
            message.style.color = "Red";
            return;
        }
        fetch(`/deleteBook/${bookID}`, {method: "DELETE"})
            .then(response => response.text())
            .then(responseMessage => {
                message.textContent = `Bok med ID ${bookID} er slettet!`; // Viser riktig melding
                message.style.color = "Green";
            })
            .catch(error => {
                console.error("Error deleting book: ", error);
                message.textContent = "Feil ved sletting av bok.";
                message.style.color = "Red";
            });
    }



    //  Koble submit-knappen til send-funksjonen
    submitbutton.addEventListener("click", collectAndSendBook);
    deletebutton.addEventListener("click", deleteBook);
    viewDataButton.addEventListener("click", viewData);

    //  Hent bøker når siden lastes
    //getBooks() viewdata() // begge har samme oppgave blue vs purple bare
    //viewData()
    document.addEventListener("DOMContentLoaded", getBooks);
});
