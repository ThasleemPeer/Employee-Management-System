
# Employee Management System

The **Employee Management System** is a web-based application designed to manage the employees of an organization. It allows users to perform CRUD (Create, Read, Update, Delete) operations on employee records, track their roles, salaries, and other personal details. This project is built using React for the frontend, Django for the backend, and MySQL for the database.

## Features

- **Employee Dashboard:** View the list of all employees in the organization.
- **Add New Employee:** Add new employee records with details like name, department, role, and salary.
- **Update Employee Details:** Update the details of an existing employee.
- **Delete Employee:** Remove an employee from the system.
- **Search & Filter:** Search and filter employees based on different criteria.
- **Responsive UI:** The interface is designed to be responsive and user-friendly.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Django
- **Database:** MySQL
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites

- Install Node.js (for React) from [nodejs.org](https://nodejs.org/).
- Install Python (for Django) from [python.org](https://www.python.org/).
- Install MySQL and MySQL Workbench for database management.
- Set up a Vercel account for deployment.

### Backend Setup (Django)

1. Clone the repository.
    ```bash
    git clone https://github.com/ThasleemPeer/Employee-Management-System.git
    ```

2. Navigate to the backend folder and set up a virtual environment.
    ```bash
    cd backend
    python -m venv venv
    ```

3. Activate the virtual environment.
    - On Windows:
        ```bash
        .\venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4. Install the required Python packages.
    ```bash
    pip install -r requirements.txt
    ```

5. Set up the MySQL database and update the database settings in `settings.py`.

6. Run the migrations to set up the database schema.
    ```bash
    python manage.py migrate
    ```

7. Create a superuser for Django admin.
    ```bash
    python manage.py createsuperuser
    ```

8. Start the Django server.
    ```bash
    python manage.py runserver
    ```
