const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/', (req, res) => {
  users.get()
    .then((results) =>{
      res.status(200).json(results)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  users.getUserPosts(req.params.id)
  .then(results =>{
    res.status(200).json(results)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  users.remove(req.params.id)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', validateUserId(), (req, res) => {
  users.update(req.params.id, req.body)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      next(error)
    })
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if(user) {
          req.user = user
          next()
        }else {
          res.status(400).json({message: "invalid user id"})
        }
      })
      .catch((error) => {
        next(error)
      })
  }
}

function validateUser() {
  return (req, res, next) => {
    console.log(req.body);
    if(!req.body){
      res.status(400).json({message: "missing user data"})
    }else if(!req.body.name){
      res.status(400).json({message: "missing required name field"})
    }else {
      next()
    }
  }
}

function validatePost(){
  return (req, res, next) => {
    if(!req.body){
      res.status(400).json({message: "missing post data"})
    }else if(!req.body.text){
      res.status(400).json({message: "missing required text field"})
    }else {
      next()
    }
  }
}

module.exports = router;
