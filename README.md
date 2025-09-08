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




