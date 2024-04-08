document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // const email = document.getElementById('email').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data === 0) {
            // Registration was successful
            // alert("Registration successful. Redirecting to login page...");
            window.location.href = "/"; // Redirect to login page
        } else if (data === 1) {
            // Username already exists
            alert("Username or password is incorrect. Please try again.");
        } else {
            // Unknown response
            alert("An unknown error occurred.");
        }
    })
    .catch((error) => {
        console.error('Error getting the response:', error);
        
    });
});