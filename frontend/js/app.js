document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const tabName = urlParams.get('tab'); // Get the tab name from the query parameter

  if (tabName) {
    // Call showTab with the tab value from the URL
    showTab(tabName);
  } else {
    // Default to 'assets' tab if no tab is provided
    showTab('assets');
  }

  fetchAssets();
  fetchUsers();
  fetchAllocations();
});

function showTab(tabName) {
  // Remove the 'active' class from all tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add 'active' class to the clicked tab
  document.getElementById(`${tabName}Tab`).classList.add('active');

  // Hide all tab content sections
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // Show the content of the selected tab
  document.getElementById(tabName).style.display = 'block';
}

function logout() {
  // Clear JWT token from localStorage and redirect to login page
  localStorage.removeItem("access_token");
  window.location.href = "login.html";
}

function fetchAssets() {
  const accessToken = localStorage.getItem("access_token");

  fetch("http://localhost:8000/api/assets/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const assetsList = document.getElementById("assetsList");
    assetsList.innerHTML = '';
    data.forEach(asset => {
      const listItem = document.createElement("tr");
      listItem.innerHTML = `
        <td>${asset.far_id}</td>
        <td>${asset.brand}</td>
        <td>${asset.model_number}</td>
        <td>${asset.asset_type}</td>
        <td>${asset.category}</td>
        <td style="color: ${asset.resource_user ? 'blue' : 'green'};">${asset.resource_user ? asset.resource_user.name : 'None'}</td>
      `;
      listItem.onclick = () => showAssetDetails(asset.id);
      assetsList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error:', error));
}

function fetchUsers() {
  const accessToken = localStorage.getItem("access_token");

  fetch("http://localhost:8000/api/resource-users/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = '';
    data.forEach(user => {
      const listItem = document.createElement("tr");
      listItem.innerHTML = `
        <td>${user.name}</td>
        <td>${user.department}</td>
        <td>${user.contact_info}</td>
      `;
      listItem.onclick = () => showUserDetails(user.id);
      usersList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error:', error));
}

function fetchAllocations() {
  const accessToken = localStorage.getItem("access_token");

  fetch("http://localhost:8000/api/allocations/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const allocationsList = document.getElementById("allocationsList");
    allocationsList.innerHTML = '';
    data.forEach(allocation => {
      const listItem = document.createElement("tr");
      listItem.innerHTML = `
        <td>${allocation.asset_detail.far_id}</td>
        <td>${allocation.asset_detail.brand}</td>
        <td>${allocation.asset_detail.model_number}</td>
        <td>${allocation.asset_detail.asset_type}</td>
        <td>${allocation.asset_detail.category}</td>
        <td>${allocation.resource_user_detail.name}</td>
        <td>${allocation.resource_user_detail.department}</td>
        <td>${allocation.resource_user_detail.contact_info}</td>
      `;
      listItem.onclick = () => showAllocationDetails(allocation.id);
      allocationsList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error:', error));
}

function showAssetDetails(assetId) {
  window.location.href = `asset_details.html?asset_id=${assetId}`;
}

function showUserDetails(userId) {
  window.location.href = `user_details.html?user_id=${userId}`;
}

function showAllocationDetails(allocationId) {
  window.location.href = `resource_allocation_details.html?allocation_id=${allocationId}`;
}
