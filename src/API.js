const API_URL = `http://localhost:3000`;

export default {
	getPath(path) {
		return new Promise((resolve, reject) => {
			const options = {method: 'GET'};
			fetch(`${API_URL}/path?query=${path}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => console.error(err));
		});
	}, // postItem(data) {
	// 	return new Promise((resolve, reject) => {
	// 		let parts = data.split(";");
	// 		let itemContent = parts[0];
	// 		let itemCategory = parts[1];
	// 		if (itemCategory === undefined) {
	// 			itemCategory = "default";
	// 		}
	//
	// 		const xhr = new XMLHttpRequest();
	// 		xhr.open("POST", API_URL);
	// 		xhr.setRequestHeader("Content-Type", "application/json");
	// 		xhr.setRequestHeader("Accept", "application/json");
	// 		xhr.send(JSON.stringify({content: itemContent.trim(), category: itemCategory.trim()}));
	// 		xhr.onload = function() {
	// 			if (this.status === 200) {
	// 				let item = JSON.parse(this.responseText);
	// 				resolve(item);
	// 			} else {
	// 				reject(this.responseText);
	// 			}
	// 		};
	// 	});
	// },
};
