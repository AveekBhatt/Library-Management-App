# Library-Management-App
This is a Library Management MERN Wesbite

PostMan Documentation : https://library-9294.postman.co/workspace/LibraryManagemnt~388e9023-118a-47d8-8fa1-1d61a86c240c/collection/28923200-0cf8d43c-59a8-4809-91e3-180e7c05ead7?action=share&source=copy-link&creator=28923200

Backend : 

1.  Authentication

Signup (Users & Admins)

Users: /signup

Admins: /adminsignup

Stores name, email, password, confirmPassword.

Passwords are compared before saving.

JWT token is generated for authentication.

Login (Users & Admins)

Users: /login

Admins: /Adminlogin

Verifies email and password (bcrypt compare).

On success → generates JWT Access Token.

Token Verification

Middleware authenticateToken extracts user from JWT.

Used in all protected routes (borrow, return, fetch, etc).

2.  User Functionalities

Register & Login (/signup, /login)

Borrow Book (/borrowbook/:bookId)

Changes book status → Available ➝ Borrowed.

Stores borrower as logged-in user’s email.

Return Book (/returnbook/:bookId)

Sets status back to Available.

Clears borrower.

See Available Books (/fetch-book)

Only available (not borrowed) books are shown.

Show My Borrowed Books (/showborrowed)

Lists books borrowed by the logged-in user.

Search Books

/search-note → search all books (by title/author).

/search-note-borrow → search only borrowed books of that user.

3. Admin Functionalities

Register & Login (/adminsignup, /Adminlogin)

Post New Book (/post-book)

Only admin can add books.

Delete Book (/Admindeletebook/:bookId)

Admin can delete a book.

Borrow Book (Admin) (/Adminborrowbook/:bookId)

Admin borrows without borrower email logic.

Return Book (Admin) (/Adminreturnbook/:bookId)

Sets book back to available.

Dashboard (/dashboard)

View all books (both available + borrowed).

4. Book Model Usage

Each Book has fields:

ISBN, title, subtitle, author, published, publisher, pages, description, status (Available or Borrowed), and borrower (email).

5. Searching (with Regex Fix)

Function escapeRegex() ensures special characters (C++, C#) don’t break search.

Used in /search-note & /search-note-borrow.

Searches by title or author (case insensitive).

6.  Utilities

bcrypt → password hashing.

jsonwebtoken → JWT auth system.

cors → allows frontend to talk to backend.

dotenv → manage environment variables (e.g., secret keys).

mongoose → interact with MongoDB.






















Frontend : 

1. Components

Navbar (Navbar.jsx)

Displays navigation for users.

Handles search functionality (onSearchnote, handleclearnote).

Allows logout and redirect to login if no token is found.

NavbarAdmin (NavbarAdmin.jsx)

Admin-specific navigation bar.

Provides links to admin dashboard, book posting, and logout.

BookCard (BookCard.jsx)

UI for displaying available books with title, description, and a "Borrow" button.

Button calls backend /borrowbook/:id.

BookCardBorrowed (BookCardBorrowed.jsx)

UI for displaying borrowed books.

Includes option to "Return" the book.

2. Pages

Home (Home.jsx)

Displays all available books.

Supports borrowing books.

Integrates search functionality to filter books.

Login (Login.jsx)

User login page.

On success, saves JWT token to localStorage and redirects to Home.

SignUp (SignUp.jsx)

User registration form.

Calls /signup API.

UserPost (UserPost.jsx)

Page for normal users to post new books.

Calls /user-post-book API.

UserPostPage (UserPostPage.jsx)

Lists books posted by the user.

Allows user to manage their own books.

AdminLogin (AdminLogin.jsx)

Admin login page.

On success, saves JWT token and redirects to Admin dashboard.

AdminSignUp (AdminSignUp.jsx)

Admin registration form.

Calls /adminsignup API.

AdminPost (AdminPost.jsx)

Admin-only page to add new books.

Calls /post-book API.

3. Utilities

axiosInstance.js

Configures Axios with baseURL pointing to backend.

Attaches Authorization header with JWT token if available.

constants.js

Stores reusable constants (e.g., API endpoints, config values).

helper.js

Contains utility functions for common frontend tasks.

4. Core Files

App.jsx

Root component.

Defines routing (React Router) between all pages (Login, Signup, Home, Admin pages, etc).

Ensures token validation and redirects unauthenticated users to login.

main.jsx

Entry point of the React app.

Renders App component into index.html.

index.html

Base HTML file.

React mounts inside <div id="root">.

App.css / index.css

Global styles for the app.

5. Frontend Features

Authentication

Stores JWT token in localStorage.

Redirects to login if no token exists.

Books Management

User: View available books, borrow, return, search, and post new books.

Admin: Add books, delete books, borrow/return as admin, view all books in dashboard.

Search

Uses /search-note for general search.

Uses /search-note-borrow for searching borrowed books.

Separation of Roles

Different navigation and page access for users and admins.

Token + usertype determine which pages a person can visit.

6. Flow Summary

User/Admin Signup or Login

Get JWT token → save in localStorage.

Authenticated Routes

Token sent with every request via Axios.

Users

Home → see available books.

Borrow/Return books.

Post books.

Search books.

Admins

Admin Dashboard → see all books.

Post/Delete books.

Borrow/Return books.

Search across all books.

Would you like me to now combine backend + frontend into a single System Workflow Document (so you see how everything connects end-to-end)?


