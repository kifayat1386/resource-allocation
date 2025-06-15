document.addEventListener('DOMContentLoaded', function () {
  if (!localStorage.getItem("access_token")) {
    window.location.href = "login.html";  // Redirect to login if not logged in
  } else {
    showTab('assets');
    fetchAssets();
    fetchUsers();
    fetchAllocations();
  }
});

function showTab(tabName) {
  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add active class to the selected tab
  document.getElementById(`${tabName}Tab`).classList.add('active');

  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // Show the selected tab's content
  document.getElementById(tabName).style.display = 'block';
}

function logout() {
  // Clear JWT token from localStorage and redirect to login page
  localStorage.removeItem("access_token");
  window.location.href = "login.html";
}

function showTab(tabName) {
  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add active class to the selected tab
  document.getElementById(`${tabName}Tab`).classList.add('active');

  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // Show the selected tab's content
  document.getElementById(tabName).style.display = 'block';
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

function searchAssets() {
  const searchQuery = document.getElementById('assetSearch').value.toLowerCase();
  const rows = document.querySelectorAll('#assetsList tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchQuery) ? 'table-row' : 'none';
  });
}

function showAssetDetails(assetId) {
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
    window.location.href = `asset_details.html?asset_id=${data.id}`;
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

function searchUsers() {
  const searchQuery = document.getElementById('userSearch').value.toLowerCase();
  const rows = document.querySelectorAll('#usersList tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchQuery) ? 'table-row' : 'none';
  });
}

function showUserDetails(userId) {
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
    window.location.href = `user_details.html?user_id=${data.id}`;
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

function searchAllocations() {
  const searchQuery = document.getElementById('allocationSearch').value.toLowerCase();
  const rows = document.querySelectorAll('#allocationsList tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchQuery) ? 'table-row' : 'none';
  });
}

function showAllocationDetails(allocationId) {
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
    window.location.href = `allocation_details.html?allocation_id=${data.id}`;
  })
  .catch(error => console.error('Error:', error));
}
