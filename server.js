const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://semm:ex8R50OjYd65rMgm@cluster0.oxnar.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(connectionString)

	.then(client => {
		console.log('Connected to Database')
		const repertoireDB = client.db('repertoire')

	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/index.html')
	})
	app.post('/addMusicPiece', (request, response) => {
		console.log('hello')
	})



	})
	.catch(error => console.error(error))






const PORT = 8000
app.listen(PORT)
console.log(`Server is running on port${PORT}`)