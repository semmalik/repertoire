const deletePiece = document.querySelectorAll('.delete')

Array.from(deletePiece).forEach((element) => {
	element.addEventListener('click', removeFromRepertoire)
})



async function removeFromRepertoire() {

	const composer = this.parentNode.childNodes[0].innerText
	// const musicTitle = this.parentNode.childNodes[3].innerText

	console.log(`deleting by ${composer}`)

	try {
		const response = await fetch('/finishedPieces', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'composerS': composer,
				// 'musicTitleS': musicTitle
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()
	}catch(err) {
		console.log(err)
	}
}




// async function deleteRapper(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     try{
//         const response = await fetch('deleteRapper', {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'stageNameS': sName,
//               'birthNameS': bName
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }







// // not currently fuctioning
// document.querySelector('#update').addEventListener('click', addPracticeDate)



// async function addPracticeDate() {
// 	console.log('inside main.js addPracticeDate function')
// 	const composer = document.getElementById('composerUpdate').value
// 	const musicTitleUpdate = document.getElementById('musicTitleUpdate').value
// 	console.log(`musicTitleUpdate: ${musicTitleUpdate}`)
// 	const dateUpdate = document.getElementById('dateUpdate').value
// 	console.log(`dateUpdate: ${dateUpdate}`)
// 	const confidenceLevelUpdate = document.getElementById('clUpdate').value
// 	console.log(`confidenceLevelUpdate: ${confidenceLevelUpdate}`)

// 	try {
// 		const response = await fetch('/addPracticeDate', {
// 			method: 'put',
// 			headers: {'Content-Type': 'application/json'},
// 			body: JSON.stringify({
// 				'composer': composer,
// 				'musicTitle': musicTitleUpdate,
// 				'date': dateUpdate,
// 				'confidenceLevel': confidenceLevelUpdate
// 			})
// 		})
// 		const data = await response.json()
// 		console.log(data)
// 		// location.reload('/')
// 	} catch(err){
// 		console.log(err)
// 	}
// }

