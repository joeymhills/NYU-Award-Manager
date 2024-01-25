# NYU Langone Health Award Tracking Application

## Overview

This repository contains the source code for a Next.js application designed to track awards received by NYU Langone Health. The application includes CRUD (Create, Read, Update, Delete) functionality, user authentication, and different user roles with varying permissions.

## Features

- **Authentication:**
  - Secure user authentication system using NextAuth.
  
- **User Roles:**
  - **User:** Can search for awards and generate reports.
  - **Manager:** Has user permissions and can create and delete awards.
  - **Admin:** Has all permissions, including access to the admin dashboard for user management.

- **Admin Dashboard:**
  - Admins can manage users and perform additional administrative tasks.

- **Printable Reports:**
  - All users can generate printable reports on awards for easy documentation and sharing.
 
## License

This project is licensed under the [MIT License](LICENSE).
