# Resource Allocator

A web-based application to manage organizational assets, track depreciation, and allocate resources efficiently.

---

## Project Overview

Resource Allocator helps admins maintain detailed asset records with purchase information, calculate depreciation dynamically based on useful life, and manage allocation/deallocation of assets to resource users. It provides a responsive static frontend, a robust Django REST backend, and a PostgreSQL database — all containerized with Docker for easy development and deployment.

---

## Features

- Asset management with brand, model, purchase date, purchase amount, useful life, and notes  
- Automatic calculation of depreciation per year and accumulated depreciation based on current date  
- Resource user management with name, department, and contact information  
- Allocation and deallocation of assets with allocation history tracking  
- Dashboard displaying asset status, depreciation, and allocation information  
- Label printing with depreciation and useful life details  
- Full Docker Compose setup for frontend, backend, and database services  

---

## Technology Stack

- **Frontend:** Responsive static HTML, CSS, and JavaScript served by Nginx in Docker  
- **Backend:** Django REST Framework with Gunicorn in Docker  
- **Database:** PostgreSQL in Docker  
- **Containerization & Orchestration:** Docker and Docker Compose  

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

### Running the App Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/resource-allocator.git
   cd resource-allocator
