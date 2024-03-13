# Course Selling Application

This is a course selling application designed for both administrators and users. It allows users to browse and purchase courses, while administrators can manage courses, users, and other administrative tasks.

## Authentication

This application implements role-based authentication using JWT (JSON Web Tokens) and OAuth 2.0 with Google authorization.

- **JWT (JSON Web Tokens)**: JWT is used for securing the communication between the frontend and backend. Upon successful authentication, the backend generates a JWT token, which is then included in subsequent requests from the frontend. The token contains user details and roles, allowing the backend to authorize requests based on user permissions.

- **OAuth 2.0 with Google Authorization**: Users can also authenticate using OAuth 2.0 with Google. This allows users to log in using their Google accounts, providing a seamless authentication experience.

## Features

- **User Features:**
  - Browse available courses
  - Enroll in courses
  - View purchased courses
  - User authentication and authorization

- **Admin Features:**
  - Add, edit, and delete courses
  - Manage user accounts
  - View sales and revenue statistics
  - Admin authentication and authorization

## Technologies Used

- **Backend (Main Application):**
  - Technology: Spring Boot
  - Database: MySQL
  - Authentication: JSON Web Tokens (JWT) for user and admin authentication

- **Frontend (Main Application):**
  - Technology: React.js
  - State Management: Recoil
  - UI Framework: Material-UI

- **Additional Next.js Application:**
  - Technology: Next.js
  - SSR (Server-Side Rendering) for improved SEO and performance
  - Integration with the main application for seamless user experience

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository:
   
   ```bash
   git clone <repository-url>
   ```
   
3. Navigate to the backend directory:
  
  ``` bash
  cd course-selling-backend
  ```

3. Configure your database settings in application.properties or application.yml.

4. Build and run the backend server:

  ```bash
  ./mvnw spring-boot:run
  ```

5. Open another terminal and navigate to the frontend directory:

  ```bash
  cd ../course-selling-frontend
  ```

6. Install dependencies:

  ```bash
  npm install
  ```

7. Start the frontend server:

  ```bash
  npm start
  ```
8. Access the application in your web browser at http://localhost:5173.

9. Optionally, if you want to run the Next.js app:

  ```bash
  cd ../course-selling-nextjs
  npm install
  npm run dev
  ```
Access the Next.js application at http://localhost:3000.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have any suggestions for improvements.


