function AddPlaceOnClick() {
	var id = document.getElementById('idPlace').value;
	var name = document.getElementById('namePlace').value;
	var description = document.getElementById('descriptionPlace').value;
	var point = document.getElementById('pointPlace').value;
	var latitude = document.getElementById('latitudetPlace').value;
	var longtitude = document.getElementById('longtitudePlace').value;
	insertData(id, name, description, point, latitude, longtitude);


	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();

	
	// console.log(file.name);
	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{
		var uploadTask = storageRef.child('images/' + id + ".jpg").put(file);
		alert('Complete');
	}


}


function insertData(id, name, description, point, latitude, longtitude){
	var firebaseRef = firebase.database().ref("Place");
	firebaseRef.push({
		place_id:id,
		name:name,
		point:point,
		description:description,
		latitude:latitude,
		longtitude:longtitude
	});
	myFunction2();
}


function myFunction2() {
	myVar = setTimeout(nextpage(), 4000);
}



function nextpage() {
	alert("complete");
    // window.location= "staff_change_place.html";
}