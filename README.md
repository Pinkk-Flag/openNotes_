# openNotes_
A collaborative full stack note sharing app (that I spent way too much time on).


## Installation
- Clone the repository
```bash
git clone https://github.com/Pinkk-Flag/openNotes_.git
```
- cd into it
```bash
cd openNotes_
```
- Create two termainal instances (one for the frontend, and another for the backend).
- Frontend setup:
```bash
cd client
```
```bash
npm install
```
```bash
npm run dev
```
or instead of run dev you can use run build, but tbh i'm not sure what that even does, i think it's a static site. i used npm run dev though.
```bash
npm run build
```
- Backend setup
```bash
cd server (OR cd ../server if you were in the client previously, however if you created a new terminal instance with pwd at openNotes_ use the first command)
```
```bash
npm install
```
```bash
npm install
```
```bash
node server.js
```

- Keep in mind you should also setup the prisma migrations. It uses PostgreSQL so you should be fine with hosting locally. Keep in mind to update the .env file in `./server` accordingly with the `JWT_SECRET` and `DATABASE_URL` (optionally, the PORT as well, I highly recommnd using port 8000 because of all the components in `./client/src/lib` depend on it).
- Afterwards, simply go into the tab that the frontend has spawned, and that should be it!

## Stack and Tools Used
openNotes_ has been a long journey. The first version originated a long time ago, and was just a simple static github page with nothing interactive at all. I mean.. literally nothing. I *manually* put every single table entry, and link to the url of the file to download it. Yeah, I feel stupid looking back, but also happy I had the original idea. It wasn't much, but it was honest work. It was functional, and helped people. 

This version does infact work dozens, if not *hundreds* of times more effectively, while keeping the idea of openNotes_ true.

Before I get into the features, I want to get into the stack that this used. Just as a disclaimer, it was my first time using many of these tools, but they progressed me forward so much as a developer, so the code quality might not be *best*, but it got the job done for me in a way that just made sense.
- Svelte
- Prisma ORM
- PostgreSQL
- ExpressJS
- NodeJS

Frontend was in Svelte, and the rest was in the other mentioned tools. I also learnt some other JS libraries like path, nodemon, bcryptjs, Jsonwebtokens, fs, multer, path and cors. 

## Features
- Fully fletched, and functional table navigation of folders and files (for development, they were put inside the ./server/public folder). Inlcudes the option to go back into the parent folder. Includes the table row of "../" to navigate to the previous directory.
- The ability to download and upload files in whatever current directory they are in, utilising blobs, and other libraries to aid with this. Completely dynamic, and supports many file types including PDFs, DOCX, TXT, etc, amongst others, as well as a file limit of 5MB. So much more efficient than emailing me the notes and then me manually adding it to the suuuper long HTML file (yes, that's what I did, I really though that was how those file servers did it).
- A token economy, where the user defaults to 100 tokens. A successful upload will query the database and add 30 tokens to the user. Downloading a file requires a database query to check if they have the minimum requirement for the tokens, and then deducts 10 tokens. This is made to *incentivise sharing of notes*, a key feature the previous lacked.
- Login and Signup features including authentication with JWT (JSON Web Tokens) and the server.
- Middleware authentication to ensure the user is validly logged in before deducting and adding tokens to account balance.
- Database integration to track all users, including their email, password (hashed, using bcryptjs), and current amount of tokens within their account.

## What I learnt, and why I didn't deploy
If you're wondering why I didn't deploy such a good app (in my own eyes), it was because of how little freedom I have regarding deploying my app online for free, and justifiably. Tried with Vercel, it was really smooth, but I could not integrate the backend to have persistant storage. All other options such as render.com or fly.io required a credit card, which I currently do not have, nor do not want (I've seen those horror stories where people get absurd server fees overnight). 

A VS is obviously not possible, again, back to the broke developer thing. Same thing with bare metal. I would love to deploy, the benefits are suuuper high, and if you think that I may have a better solution that is feasable for this situation that doesn't cost anything, sending me a message at my discord "pinkflag." (case sensitive, with the period). 

Of course, for something I spent quite a considerable amount of time on, I tried so many things. Google Drive API's, persistant storage options, AWS, etc. But I was just fed up. Their free tiers were almost always no ideal, and even if I didn't pay, it'd be for like 1gb or something super stupid that would be impossible to migrate every so often. 

I guess what I could do is look on the bright side.
Here's what I learnt. It was honestly too much to say, but I'll try the best I can ;)
- Learning the frustrations of a "real dev". Ofc not real, but I felt the pressure of trying to push to production, or try get a new feature implemented.
- Using Prisma ORM properly within a project.
- Setting up a middleware
- Using Svelte for the first time, and trying to get into the runes features.
- API endpoints
- Data parsing
- Using PostgreSQL, both in general and with the CLI.
- Asynchronous JavaScript code (not very good at it, but this project taught me so much about it)
- Setting up node projects
- Splitting up your project into files
- Setting up a full-stack application
- Using vite
- .. and so much more.

## Screenshots
I'll finish yapping and let you see the product. Have a good day, I hope you liked it. I spent a while on it, and it saddens me to not see it for a while.
<br>
![image](https://github.com/user-attachments/assets/6a25cb8a-fb44-4c1a-86ae-fcd5f8b7dcea)
<br>
![image](https://github.com/user-attachments/assets/a4b10674-f16b-4a42-bdbc-43a2c3d159e4)
<br>
![image](https://github.com/user-attachments/assets/32c83ded-bbb9-4e8c-b05a-0afa44350b71)


