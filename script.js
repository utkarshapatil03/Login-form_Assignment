// Add event listener for form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('responseMessage').textContent = '';

    // Validate username
    if (username.trim() === '') {
        document.getElementById('usernameError').textContent = 'Please enter a username.';
        return;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Save login credentials if "Remember me" is checked
    if (rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    }

    // Show loading spinner (optional, add your own spinner in HTML if you wish)
    document.getElementById('responseMessage').textContent = 'Logging in...';

    // Send API request
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        document.getElementById('responseMessage').textContent = 'Login successful!';

        // Clear input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Optionally, clear the remember me checkbox
        document.getElementById('rememberMe').checked = false;
    })
    .catch(error => {
        // Handle error
        document.getElementById('responseMessage').textContent = 'Login failed. Please try again.';
    });
});

// Function to validate email format (updated for username)
function validateUsername(username) {
    // Example: A basic validation, can be more complex based on requirements
    return username.trim() !== '';
}

// Show/Hide Password functionality
document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

// Forgot Password link functionality (Example)
document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    // You can redirect to a password recovery page or show a modal here
    alert('Forgot Password functionality is not implemented yet.');
});
