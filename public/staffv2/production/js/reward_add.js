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

			insertData(name, des, point, key);
		});

		
		
	}


}


function insertData(name, des, point, key){
	var key2 = key.toString();

	firebase.database().ref("Reward").push({
		name:name,
		description:des,
		point:point,
		id:key2
	}, function(error) {
		if (error) {
			alert(error);
		} else {
			window.location= "reward.html";
		}
	});





	
}





