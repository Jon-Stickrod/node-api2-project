const express = require('express');
const posts = require('./db.js');
const router = express.Router();



router.get('/', (req, res) => {
  posts.find(req.query)
  .then(posts => {
    res.status(201).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

router.get('/:id', (req, res) => {
  posts.findById(req.params.id)
  .then(post => {
    console.log(post);
    if(post){
    res.status(201).json(post);
    }
    else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

router.get('/:id/comments', (req, res) => {
  posts.findPostComments(req.params.id)
  .then(post => {
    if(post){
    res.status(201).json(post);
    }
    else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});
router.post('/', (req, res) => {
  posts.insert(req.body)
  .then(post => {
    res.status(201).json(post);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});

router.post('/:id/comments', (req, res) => {
  posts.insertComment(req.body)
  .then(post => {
    console.log(post);
    if(req.params.id){
    res.status(201).json(post);
    }
    else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});

router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(201).json(count);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  posts.update(req.params.id, changes)
  .then(post => {
    res.status(201).json(req.body);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  });
});

module.exports = router;