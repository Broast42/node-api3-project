// code away!
const server = require('./server')
const port = 4000

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "An error occured",
	})
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})