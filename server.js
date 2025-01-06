import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to the api');
})

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => console.log('Server is running on port 5000'));