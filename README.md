This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started 

This project contains the Frontend, Backend and the SQL commands to setup seed the database with random data

## Database

To seed the database navigate to the /database directory and run the ```schema_creation.sql```. 

One way to do this is to copy ```schema_creation.sql``` to the ```/var/lib/postgresql``` directory and populate the database

```
psql -U postgres -a -f schema_creation.sql
```

## Backend

First, navigate to the /backend directory and run:
```
node server.js
```
The backend express server should run on localhost port 3000

## Frontend
First, run the development server on /vivid/myapp:

```bash
npm run dev
```
To run it on production server:
```
npm start
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
