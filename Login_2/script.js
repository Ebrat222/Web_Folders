// Function to switch between tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}

// Login form submission handler
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Basic validation example
    if (username.length < 3 || password.length < 8) {
        document.getElementById('login-error-message').innerText = 'Username should be at least 3 characters and password should be at least 8 characters.';
    } else {
        // Here you would typically send the data to a server for authentication
        // For demonstration purposes, we'll just log the input values
        console.log('Username:', username);
        console.log('Password:', password);
        
        // Clear error message if validation passes
        document.getElementById('login-error-message').innerText = '';
        
        // You can add code here to redirect or perform other actions after successful validation
    }
});

// Sign Up form submission handler
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Basic validation example
    if (username.length < 3 || password.length < 8 || password !== confirmPassword) {
        document.getElementById('signup-error-message').innerText = 'Username should be at least 3 characters, password should be at least 8 characters, and passwords should match.';
    } else {
        // Here you would typically send the data to a server for registration
        // For demonstration purposes, we'll just log the input values
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        
        // Clear error message if validation passes
        document.getElementById('signup-error-message').innerText = '';
        
        // You can add code here to redirect or perform other actions after successful validation
    }
});

// Forgot Password form submission handler
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const email = document.getElementById('forgot-email').value;

    // Basic validation example
    if (!email.includes('@')) {
        document.getElementById('forgot-error-message').innerText = 'Please enter a valid email address.';
    } else {
        // Here you would typically send the data to a server to send a reset link
        // For demonstration purposes, we'll just log the input value
        console.log('Email:', email);
        
        // Clear error message if validation passes
        document.getElementById('forgot-error-message').innerText = '';
        
        // You can add code here to redirect or perform other actions after successful validation
    }
});
