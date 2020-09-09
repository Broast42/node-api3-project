const express = require('express');
const posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  posts.getById(req.params.id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validatePostId(), (req, res) => {
  posts.remove(req.params.id)
    .then(results => {
      res.status(200).json(req.post)
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validatePostId(), (req, res) => {
  posts.update(req.params.id, req.body)
    .then(results => {
      res.status(201).json(results)
    })
    .catch(error => {
      next(error)
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
  posts.getById(req.params.id)
      .then((post) => {
        if(post) {
          req.post = post
          next()
        }else {
          res.status(400).json({message: "invalid post id"})
        }
      })
      .catch((error) => {
        next(error)
      })
    }
}

module.exports = router;
