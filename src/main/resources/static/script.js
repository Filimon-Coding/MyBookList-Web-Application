

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


        if (name === "" || author === ""  || description === "" || gener.value === "" || year === ""){
            // alert("Fill all the field first")
            message.textContent = "You have not filed out all the empty input field"
            message.style.color = "Red"
        }

        message.textContent = "Yes ok ";
        message.style.color = "yello";


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
        console.log (gener);
        console.log (year);

        message.textContent = "The book registered correctly";
        message.style.color = "Green";

        return false;
    }

    submitbutton.addEventListener("click", validateForm)


});