document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      window.location.href = "index.html";  // Redirect to home page
    } else {
      alert("Invalid credentials. Please try again.");
    }
  })
  .catch(error => console.error("Error:", error));
});
