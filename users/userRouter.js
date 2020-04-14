const express = require('express');
const users = require('./userDb')

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

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
    }else if(req.body.text){
      res.status(400).json({message: "missing required text field"})
    }else {
      next()
    }
  }
}

module.exports = router;
