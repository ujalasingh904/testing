import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/connectDB.js';
import { clerkMiddleware, requireAuth } from "@clerk/express"
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
  }
)); 

app.use(clerkMiddleware());
app.use(express.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/",(req,res)=>{
  res.send("Welcome to the API")
})

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/authUsers", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(5000, () => {
  connectDB();
  console.log(`Server running on port 5000`);
});   