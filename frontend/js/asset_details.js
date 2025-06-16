document.addEventListener('DOMContentLoaded', function () {
  // Get the asset_id from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = urlParams.get('asset_id');

  if (assetId) {
    fetchAssetDetails(assetId);
  } else {
    // Redirect to main page if asset_id is missing
    window.location.href = "index.html";
  }
});

// Fetch asset details by ID
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

// Function to delete the asset
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
    window.location.href = "index.html"; // Redirect after deletion
  })
  .catch(error => console.error('Error:', error));
}

// Function to update the asset (you can add your logic here)
function updateAsset() {
  const accessToken = localStorage.getItem("access_token");
  const assetId = new URLSearchParams(window.location.search).get('asset_id');

  // Update logic here, for example, showing a form to edit the asset
  alert('Update Asset functionality is under development');
}

function redirectToIndex(tabName) {
  // Redirect to index.html with the selected tab as a query parameter
  window.location.href = `index.html?tab=${tabName}`;
}

function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "login.html"; // Redirect to login page after logout
}
