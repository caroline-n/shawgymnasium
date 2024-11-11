document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const eventDate = document.getElementById("eventDate").value;
    const quantity = document.getElementById("quantity").value;

    // Define your Google Sheet API URL here\
    const url = 'https://script.google.com/macros/s/AKfycbw35EHha8-K4Vpa6zA7mbT91eDjf0X7L6S2VLFWaubsoMxQdotYuJINbcpz2K7YA8U8/exec';

fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded" // URL-encoded form data
    },
    body: new URLSearchParams({
        name: name,
        email: email,
        eventDate: eventDate,
        quantity: quantity
    })
})
.then(response => response.json())
.then(data => {
    if (data.result === "success") {
        document.getElementById("confirmationMessage").innerText = "Reservation Successful!";
    } else {
        document.getElementById("confirmationMessage").innerText = "Reservation Failed. Please try again.";
    }
})
.catch(error => {
    document.getElementById("confirmationMessage").innerText = "Error: " + error.message;
});

});