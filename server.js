const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000


const connectionString = 'mongodb://semm:ex8R50OjYd65rMgm@cluster0-shard-00-00.oxnar.mongodb.net:27017,cluster0-shard-00-01.oxnar.mongodb.net:27017,cluster0-shard-00-02.oxnar.mongodb.net:27017/?ssl=true&replicaSet=atlas-ezznrs-shard-0&authSource=admin&retryWrites=true&w=majority'

// const connectionString = 'mongodb+srv://semm:ex8R50OjYd65rMgm@cluster0.oxnar.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'repertoire'
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
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
	db.collection('finishedPieces').find().sort({composer: 1}).toArray()
	.then(data => {
		response.render('index.ejs', {info: data})
	})
	.catch(error => console.error(error))
})
	
app.post('/music', (request, response) => {
  	finishedPieces.insertOne(request.body)
  		.then(result => {
  			response.redirect('/')
  		})
  		.catch(error => console.error(error))
})

app.delete('/finishedPieces', (request, response) => {
	db.collection('finishedPieces').deleteOne({composer: request.body.composerS})
	.then(result => {
		console.log('piece deleted')
		response.json('piece deleted')
	})
	.catch(error => console.error(error))
})


// // not functioning
// app.put('/addPracticeDate', (request, response) => {
// 	console.log(request.body)
// 	db.collection('finishedPieces').findOneAndUpdate(
// 		{composer: request.body.composer, musicTitle: request.body.musicTitle, date: request.body.date, confidenceLevel: request.body.confidenceLevel},
// 		{
// 			$set: request.body.date
// 				// confidenceLevel: request.body.confidenceLevel
// 		},
		
// 	)
// 	.then(result => {
// 		console.log('Added practice date')
// 		response.json('Practice date added')
// 	})
// 	.catch(error => console.error(error))
// })


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