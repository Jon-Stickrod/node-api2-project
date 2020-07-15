const express = require('express');
const dataRouter = require('./data/datarouter.js');
const posts = require('./data/db.js');
const server = express();

server.use(express.json());
server.use('/api/posts', dataRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Lets gooo</h>`);
});

server.post('/api/posts', (req, res) => {
  console.log(req.body);
  posts.insert(req.body)
  .then(post => {
    console.log(post);
    if(req.body.title && req.body.contents){
      res.status(201).json(post);
    }
    else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});
module.exports = server;