const express = require('express');
const usersRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')
const cors = require('cors')

const server = express();

server.use(express.json())
server.use(cors())

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware! Origin: ${process.env.FROM}</h2>`);
});

server.use("/users", usersRouter)
server.use("/posts", postsRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.url} ${req.method}`)
  next()
}



module.exports = server;
