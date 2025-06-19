// Password Toggle Feature
document.querySelector(".toggle-password").addEventListener("click", function() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
});

// Form Validation & Progress Bar
document.getElementById("loginForm").addEventListener("submit", function(event) {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        event.preventDefault();
        alert("Please fill in all fields!");
        return;
    }

    // Show Progress Bar
    document.getElementById("progress-bar").style.width = "100%";

    // Simulate loading
    setTimeout(() => {
        alert("Login Successful!");
    }, 2000);
});

// Particle Background Effect
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        size: { value: 3 },
        move: { speed: 2 }
    }
});
