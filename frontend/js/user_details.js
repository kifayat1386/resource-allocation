document.addEventListener('DOMContentLoaded', function () {
  // Get the user_id from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user_id');

  if (userId) {
    fetchUserDetails(userId);
  } else {
    // Redirect to main page if user_id is missing
    window.location.href = "index.html";
  }
});

// Fetch user details by ID
function fetchUserDetails(userId) {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    alert('You need to log in first!');
    window.location.href = 'login.html'; // Redirect to login page if no token
    return;
  }

  fetch(`http://localhost:8000/api/resource-users/${userId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Unauthorized: Please log in');
    }
    return response.json();
  })
  .then(data => {
    const content = document.getElementById("userDetailContent");

    // Check if assets are defined and is an array
    const allocatedAssets = data.assets && Array.isArray(data.assets)
      ? data.assets.map(asset => asset.far_id).join(', ')
      : 'No assets allocated';

    content.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Department:</strong> ${data.department}</p>
      <p><strong>Contact Info:</strong> ${data.contact_info}</p>
      <p><strong>Created At:</strong> ${data.created_at}</p>
      <p><strong>Allocated Assets:</strong> ${allocatedAssets}</p>
    `;
  })
  .catch(error => {
    console.error('Error:', error);
    alert(error.message);
  });
}

// Function to delete the user
function deleteUser() {
  const accessToken = localStorage.getItem("access_token");
  const userId = new URLSearchParams(window.location.search).get('user_id');

  fetch(`http://localhost:8000/api/resource-users/${userId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    alert('User deleted successfully');
    window.location.href = "index.html"; // Redirect after deletion
  })
  .catch(error => console.error('Error:', error));
}

// Function to update the user (you can add your logic here)
function updateUser() {
  const accessToken = localStorage.getItem("access_token");
  const userId = new URLSearchParams(window.location.search).get('user_id');

  // Update logic here, for example, showing a form to edit the user
  alert('Update User functionality is under development');
}

function redirectToIndex(tabName) {
  // Redirect to index.html with the selected tab as a query parameter
  window.location.href = `index.html?tab=${tabName}`;
}

function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "login.html"; // Redirect to login page after logout
}
