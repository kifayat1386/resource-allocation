document.addEventListener('DOMContentLoaded', function () {
  // Check if access token exists, otherwise redirect to login
  if (!localStorage.getItem("access_token")) {
    window.location.href = "login.html";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const assetId = urlParams.get('asset_id');
  const userId = urlParams.get('user_id');
  const allocationId = urlParams.get('allocation_id');

  if (assetId) {
    fetchAssetDetails(assetId);
  } else if (userId) {
    fetchUserDetails(userId);
  } else if (allocationId) {
    fetchResourceAllocationDetails(allocationId);
  }
});

// Fetch Asset Details
function fetchAssetDetails(assetId) {
  const accessToken = localStorage.getItem("access_token");
  fetch(`http://localhost:8000/api/assets/${assetId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const content = document.getElementById("assetDetailContent");
    content.innerHTML = `
      <p><strong>Far ID:</strong> ${data.far_id}</p>
      <p><strong>Brand:</strong> ${data.brand}</p>
      <p><strong>Model Number:</strong> ${data.model_number}</p>
      <p><strong>Asset Type:</strong> ${data.asset_type}</p>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Purchase Date:</strong> ${data.purchase_date}</p>
      <p><strong>Purchase Amount:</strong> ${data.purchase_amount}</p>
      <p><strong>Allocated To:</strong> ${data.resource_user ? data.resource_user.name : 'None'}</p>
    `;
  })
  .catch(error => console.error('Error:', error));
}

// Fetch User Details
function fetchUserDetails(userId) {
  const accessToken = localStorage.getItem("access_token");
  fetch(`http://localhost:8000/api/resource-users/${userId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const content = document.getElementById("userDetailContent");
    content.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Department:</strong> ${data.department}</p>
      <p><strong>Contact Info:</strong> ${data.contact_info}</p>
      <p><strong>Created At:</strong> ${data.created_at}</p>
      <p><strong>Allocated Assets:</strong> ${data.assets.map(asset => asset.far_id).join(', ')}</p>
    `;
  })
  .catch(error => console.error('Error:', error));
}

// Fetch Resource Allocation Details
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
    const content = document.getElementById("resourceAllocationContent");
    content.innerHTML = `
      <p><strong>Far ID:</strong> ${data.asset.far_id}</p>
      <p><strong>Brand:</strong> ${data.asset.brand}</p>
      <p><strong>Model Number:</strong> ${data.asset.model_number}</p>
      <p><strong>Asset Type:</strong> ${data.asset.asset_type}</p>
      <p><strong>Category:</strong> ${data.asset.category}</p>
      <p><strong>Resource User:</strong> ${data.resource_user.name}</p>
      <p><strong>Department:</strong> ${data.resource_user.department}</p>
      <p><strong>Allocation Date:</strong> ${data.allocation_date}</p>
    `;
  })
  .catch(error => console.error('Error:', error));
}

// Function to delete an Asset
function deleteAsset() {
  const accessToken = localStorage.getItem("access_token");
  const assetId = new URLSearchParams(window.location.search).get('asset_id');

  fetch(`http://localhost:8000/api/assets/${assetId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    alert('Asset deleted successfully');
    window.location.href = "index.html";
  })
  .catch(error => console.error('Error:', error));
}

// Function to delete a User
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
    window.location.href = "index.html";
  })
  .catch(error => console.error('Error:', error));
}

// Function to delete Resource Allocation
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
    window.location.href = "index.html";
  })
  .catch(error => console.error('Error:', error));
}

// Function to update Asset
function updateAsset() {
  const accessToken = localStorage.getItem("access_token");
  const assetId = new URLSearchParams(window.location.search).get('asset_id');

  // Here, you will provide your logic to update the asset details
  alert('Update Asset functionality is under development');
}

// Function to update User
function updateUser() {
  const accessToken = localStorage.getItem("access_token");
  const userId = new URLSearchParams(window.location.search).get('user_id');

  // Here, you will provide your logic to update the user details
  alert('Update User functionality is under development');
}

// Function to update Resource Allocation
function updateAllocation() {
  const accessToken = localStorage.getItem("access_token");
  const allocationId = new URLSearchParams(window.location.search).get('allocation_id');

  // Here, you will provide your logic to update the allocation details
  alert('Update Allocation functionality is under development');
}
