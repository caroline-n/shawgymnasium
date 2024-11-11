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
    const url = 'https://script.google.com/macros/s/AKfycbwQmmw0d3wchtBx1OPfmRJ1NUeIWL01Qxpnmd9b8GrowXzFvxQWMDQVPtQvLWAa4KaL/exec';
    

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            name: name,
            email: email,
            eventDate: eventDate,
            quantity: quantity
        }),
        mode: "no-cors" // Bypass CORS
    })
    .then(response => {
        console.log(response);
        document.getElementById("confirmationMessage").innerText = "Your reservation is going through! Please check your inbox and spam/junk folders for confirmation. If you don't receive it within 1 hour, contact us at Help page.";
    })
    .catch(error => {
        document.getElementById("confirmationMessage").innerText = "Error: Please try again later.";
    });    

});
