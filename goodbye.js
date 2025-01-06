console.log(`openNotes_ is a collaborative full-stack note-sharing app built using Svelte for the frontend, Prisma ORM, PostgreSQL, ExpressJS, and NodeJS for the backend. It evolved from a simple static GitHub page into a feature-rich application.
Features:
Dynamic Folder Navigation:
Browse folders/files with parent folder navigation (../).
File Upload & Download:
Supports multiple file types (PDF, DOCX, TXT, etc.) with a 5MB limit.
Token Economy:
Users start with 100 tokens.
Upload: Earn 30 tokens.
Download: Costs 10 tokens.
Incentivizes sharing notes.
User Authentication:
Login/Signup with JWT-based authentication.
Middleware ensures valid user sessions.
Database Integration:
Tracks user email, hashed passwords, and token balances.

openNotes_ Summary
Overview:
openNotes_ is a collaborative full-stack note-sharing app built using Svelte for the frontend, Prisma ORM, PostgreSQL, ExpressJS, and NodeJS for the backend. It evolved from a simple static GitHub page into a feature-rich application.

Installation:
Clone the repository:
bash
Copy code
git clone https://github.com/Pinkk-Flag/openNotes_.git  
cd openNotes_
Setup two terminals (one for frontend, one for backend).
Frontend:

bash
Copy code
cd client  
npm install  
npm run dev  
(Alternatively, use npm run build for static site generation.)

Backend:

bash
Copy code
cd server  
npm install  
node server.js  
Configure the .env file with JWT_SECRET, DATABASE_URL, and optionally PORT (default: 8000).
Run Prisma migrations for PostgreSQL.
Features:
Dynamic Folder Navigation:
Browse folders/files with parent folder navigation (../).
File Upload & Download:
Supports multiple file types (PDF, DOCX, TXT, etc.) with a 5MB limit.
Token Economy:
Users start with 100 tokens.
Upload: Earn 30 tokens.
Download: Costs 10 tokens.
Incentivizes sharing notes.
User Authentication:
Login/Signup with JWT-based authentication.
Middleware ensures valid user sessions.
Database Integration:
Tracks user email, hashed passwords, and token balances.
Lessons Learned:
Implementing a full-stack application with Svelte and Prisma ORM.
Middleware setup, API endpoints, and PostgreSQL CLI usage.
Handling asynchronous JavaScript and splitting projects into modular files.
Real-world challenges of deployment and persistent storage solutions.
Deployment Challenges:
Free deployment options (e.g., Vercel) lacked persistent backend storage.
Alternatives like Render and Fly.io required credit cards.
Explored options like AWS and Google Drive APIs but found limitations in free tiers.


            I don't know why you're reading this, but hello. This is the end of openNotes_. Been a real rollercoster.. I've learn so much, changed a lot, and seemingly all for nothing. I couldn't host it, cause I'm broke as fuck. Oh well.`);
