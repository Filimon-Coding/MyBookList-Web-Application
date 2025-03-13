

document.addEventListener("DOMContentLoaded", () => {
    console.log ("Last opp DOM")

    const nameInnput = document.getElementById("nameID");
    const authorInnput  = document.getElementById("authorID");
    const descriptionInnput = document.getElementById("descriptionID");
    const generSelect= document.getElementById("genreID");
    const yearInnput = document.getElementById("yearID");
    const message = document.getElementById("message");
    const submitbutton = document.getElementById("submitID");




    function validateForm(){

        const name = nameInnput.value.trim();
        const author = authorInnput.value.trim();
        const description = descriptionInnput.value.trim();
        const genre = generSelect.value.trim();
        const year = yearInnput.value.trim();


        if (name === "" || author === ""  || description === "" || year === ""){
            // alert("Fill all the field first")
            message.textContent = "You have not filed out all the empty input field"
            message.style.color = "Red"
        }




        if (name === ""){
            message.textContent = "The name field must be filled"
            message.style.color = "Red";
            return false;
        }else if (author === ""){

            message.textContent = "The author field must be filled"
            message.style.color = "Red";
            return false;
        }else if (description === ""){

            message.textContent = "The description field must be filled"
            message.style.color = "Red";
            return false ;
        }else if (genre === ""){
            message.textContent = "Chose genre from the selection";
            message.style.color = "Red";
            return false;
        } else if (year === ""){
            message.textContent = "The year field must be filled";
            message.style.color = "Red";
        return false;
        }
        const yearpatteren = /^\d{4}$/;
        if (!yearpatteren.test(year)){
            message.textContent = "Please fil vaild year data"
            message.style.color = "Red";
            return false;
        }




        console.log (name);
        console.log (author);
        console.log (description);
        console.log (genre);
        console.log (year);

        message.textContent = "The book registered correctly";
        message.style.color = "Green";

        return false;
    }
    message.textContent = "Yes ok ";
    message.style.color = "green";

    submitbutton.addEventListener("click", validateForm)


    function collectAndSendBook() {
        if (!validateForm()){
            console.log("Validering feilet, avbryter sending.")
            return;
        }

        const book = {
            name: nameInnput.value.trim(),
            author: authorInnput.value.trim(),
            description: descriptionInnput.value.trim(),
            genre: generSelect.value.trim(),
            year: yearInnput.value.trim()
        };

        // Viser data i konsollen for sjekk
        console.log("Book object to send:", book);
        // Eller bruk alert for test: alert(JSON.stringify(book));

        //  Sender til backend med fetch
        fetch('/saveBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Forteller backend at vi sender JSON
            },
            body: JSON.stringify(book) // Gjør objektet til JSON-streng
        })
            .then(response => {
                if (response.ok) {
                    message.textContent = "Book was successfully saved!";
                    message.style.color = "Green";
                } else {
                    message.textContent = "Failed to save book. Please try again.";
                    message.style.color = "Red";
                }
            })
            .catch(error => {
                console.error("Error while saving book:", error);
                message.textContent = "An error occurred while sending the book.";
                message.style.color = "Red";
            });
    }


});