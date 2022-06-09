const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = 'mongodb+srv://semm:ex8R50OjYd65rMgm@cluster0.oxnar.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(connectionString)

	.then(client => {
		console.log('Connected to Database')
		const repertoireDB = client.db('repertoire')
		app.use(bodyParser.urlencoded({extended: true}))
		app.use(bodyParser.json())

		app.get('/', (request, response) => {
			response.sendFile(__dirname + '/index.html')
		})
	
		app.post('/music', (request, response) => {
  			console.log(request.body)
		})



		})
		.catch(error => console.error(error))





const PORT = 8000
app.listen(PORT)
console.log(`Server is running on port${PORT}`)