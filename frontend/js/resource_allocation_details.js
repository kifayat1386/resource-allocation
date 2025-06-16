document.addEventListener('DOMContentLoaded', function () {
  // Get the allocation_id from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const allocationId = urlParams.get('allocation_id');

  if (allocationId) {
    fetchResourceAllocationDetails(allocationId);
  } else {
    // Redirect to main page if allocation_id is missing
    window.location.href = "index.html";
  }
});

// Fetch resource allocation details by ID
function fetchResourceAllocationDetails(allocationId) {
  const accessToken = localStorage.getItem("access_token");

  fetch(`http://localhost:8000/api/allocations/${allocationId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const content = document.getElementById("resourceAllocationContent");

    content.innerHTML = `
      <p><strong>Far ID:</strong> ${data.asset_detail.far_id}</p>
      <p><strong>Brand:</strong> ${data.asset_detail.brand}</p>
      <p><strong>Model Number:</strong> ${data.asset_detail.model_number}</p>
      <p><strong>Asset Type:</strong> ${data.asset_detail.asset_type}</p>
      <p><strong>Category:</strong> ${data.asset_detail.category}</p>
      <p><strong>Resource User:</strong> ${data.resource_user_detail.name}</p>
      <p><strong>Department:</strong> ${data.resource_user_detail.department}</p>
      <p><strong>Contact Info:</strong> ${data.resource_user_detail.contact_info}</p>
      <p><strong>Allocation Date:</strong> ${data.allocation_date}</p>
    `;
  })
  .catch(error => console.error('Error:', error));
}

// Function to delete the resource allocation
function deleteAllocation() {
  const accessToken = localStorage.getItem("access_token");
  const allocationId = new URLSearchParams(window.location.search).get('allocation_id');

  fetch(`http://localhost:8000/api/allocations/${allocationId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    alert('Resource Allocation deleted successfully');
    window.location.href = "index.html"; // Redirect after deletion
  })
  .catch(error => console.error('Error:', error));
}

// Function to update the allocation (you can add your logic here)
function updateAllocation() {
  const accessToken = localStorage.getItem("access_token");
  const allocationId = new URLSearchParams(window.location.search).get('allocation_id');

  // Update logic here, for example, showing a form to edit the allocation
  alert('Update Allocation functionality is under development');
}


function redirectToIndex(tabName) {
  // Redirect to index.html with the selected tab as a query parameter
  window.location.href = `index.html?tab=${tabName}`;
}

function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "login.html"; // Redirect to login page after logout
}