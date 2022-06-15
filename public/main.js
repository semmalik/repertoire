document.querySelector('#update').addEventListener('click', addPracticeDate)



async function addPracticeDate() {
	console.log('inside main.js addPracticeDate function')
	const musicTitleUpdate = document.querySelector('[name="musicTitleUpdate"]')
	console.log(`musicTitleUpdate: ${musicTitleUpdate}`)
	const dateUpdate = document.querySelector('[name="dateUpdate"]')
	console.log(`dateUpdate: ${dateUpdate}`)
	const confidenceLevelUpdate = document.querySelector('[name="confidenceLevelUpdate"]')
	console.log(`confidenceLevelUpdate: ${confidenceLevelUpdate}`)

	try {
		const response = await fetch('/addPracticeDate', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				musicTitle: musicTitleUpdate,
				date: dateUpdate,
				confidenceLevelS: confidenceLevelUpdate
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload('/')
	} catch(err){
		console.log(err)
	}
}




















