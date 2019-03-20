function AddPlaceOnClick() {
	var title = document.getElementById('titlePromotion').value;
	var des1 = document.getElementById('descriptionPromotion1').value;
	var des2 = document.getElementById('descriptionPromotion2').value;
	var d = new Date();
	var key = d.getTime();
	
	


	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();


	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{
		var uploadTask = storageRef.child('promotions/' + key + ".jpg").put(file);

		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress);
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: 
				console.log('Upload is paused');
				break;
				case firebase.storage.TaskState.RUNNING: 
				console.log('Upload is running');
				break;
			}
		}, function(error) {
			alert(error);
		}, function() {

			insertData(title, des1, des2, key);
		});
		
		
	}


}


function insertData(title, des1, des2, key){

	var key2 = key.toString();
	firebase.database().ref("Promotion").push({
		title:title,
		description1:des1,
		description2:des2,
		id:key2
	}, function(error) {
		if (error) {
			alert(error);
		} else {
			window.location= "staff_promotion.html";
		}
	});
	
	
}





