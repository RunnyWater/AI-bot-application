document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data === 0) {
            // Registration was successful
            // alert("Registration successful. Redirecting to login page...");
            window.location.href = "/login"; // Redirect to login page
        } else if (data === 1) {
            // Username already exists
            alert("The username already exists. Please try again.");
        } else if (data === 2) {
            // Email already exists
            alert("The email already exists. Please try again.");
        } else {
            // Unknown response
            alert("An unknown error occurred.");
        }
    })
    .catch((error) => {
        console.error('Error getting the response:', error);
        
    });
});