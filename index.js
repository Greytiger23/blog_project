import express from 'express';

const app = express();
const port = 3000;

// set main route
app.get("/", (req, res) => {
  res.send("hello world");
});

// start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});