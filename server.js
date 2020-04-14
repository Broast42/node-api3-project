const express = require('express');
const usersRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')

const server = express();

server.use(express.json())

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/users", usersRouter)
server.use("/posts", postsRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.url} ${req.method}`)
  next()
}



module.exports = server;
