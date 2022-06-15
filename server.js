const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000


const connectionString = 'mongodb+srv://semm:ex8R50OjYd65rMgm@cluster0.oxnar.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'repertoire'
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
let db
let finishedPieces

MongoClient.connect(connectionString, {useUnifiedTopology: true})
	.then(client => {
		console.log(`Connected to ${dbName}`)
		db = client.db(dbName)
		finishedPieces = db.collection('finishedPieces')		
	})
	.catch(error => console.error(error))



app.get('/', (request, response) => {
	response.render('index.ejs', {})
})
	
app.post('/music', (request, response) => {
  	finishedPieces.insertOne(request.body)
  		.then(result => {
  			response.redirect('/')
  		})
  		.catch(error => console.error(error))
})

app.put('/addPracticeDate', (request, response) => {
	db.collection('finishedPieces').updateOne({musicTitle: request.body.musicTitleS, date: request.body.dateS, confidenceLevel: request.body.confidenceLevelS},{
		$set: {
			date: request.body.dateS,
			confidenceLevel: request.body.confidenceLevelS
		}
	})
	.then(result => {
		console.log('Added practice date')
		response.json('Practice date added')
	})
	.catch(error => console.error(error))
})


app.listen(PORT)
console.log(`Server is running on port${PORT}`)



// app.put('/addOneLike', (request, response) => {
//     db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })