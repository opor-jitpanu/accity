function AddRewardOnClick() {
	var name = document.getElementById('nameReward').value;
	var des = document.getElementById('descriptionReward').value;
	var point = document.getElementById('pointReward').value;
	var d = new Date();
	var key = d.getTime();
	console.log(key);
	


	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();


	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{
		var uploadTask = storageRef.child('rewards/' + key + ".jpg").put(file);
		insertData(name, des, point, key);
		
	}


}


function insertData(name, des, point, key){
	var key2 = key.toString();
	var firebaseRef = firebase.database().ref("Reward");
	firebaseRef.push({
		name:name,
		description:des,
		point:point,
		id:key2
	});
	alert('Complete');
}

