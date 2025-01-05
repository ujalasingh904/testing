import express from 'express';

const app = express();

app.get("/", (req,res)=>{
    res.send("this is the homepage");
})

app.get("/hello", (req,res)=>{
    res.send("Hello World");
})

app.listen(5000, ()=>{
    console.log(`server is running on port http://localhost:5000`);
});