function AddPlaceOnClick() {
	var id = document.getElementById('idPlace').value;
	var name = document.getElementById('namePlace').value;
	var description = document.getElementById('descriptionPlace').value;
	var point = document.getElementById('pointPlace').value;
	var latitude = document.getElementById('latitudetPlace').value;
	var longtitude = document.getElementById('longtitudePlace').value;
	


	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();

	
	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{
		var uploadTask = storageRef.child('images/' + id + ".jpg").put(file);



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

			insertData(id, name, description, point, latitude, longtitude);
		});
		
	}



}


function insertData(id, name, description, point, latitude, longtitude){

	firebase.database().ref("Place").push({
		place_id:id,
		name:name,
		point:point,
		description:description,
		latitude:latitude,
		longtitude:longtitude
	}, function(error) {
		if (error) {
			alert(error);
		} else {
			window.location= "staff_change_place.html";
		}
	});

	
}








