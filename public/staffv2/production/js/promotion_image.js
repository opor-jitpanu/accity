function addImageOnClick(){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var key = url.searchParams.get("key");

	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();

	
	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{

		var uploadTask = storageRef.child('promotions/'+key+'.jpg').put(file);

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

			window.location= "promotion.html";
		});
	}


}


window.onload = function(){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var key = url.searchParams.get("key");



	var leadsRef = firebase.database().ref("Promotion");
	leadsRef.orderByChild('id').equalTo(key).on('value', function(snapshot) {
		var obj3 = {};
		snapshot.forEach(function(childSnapshot) {
			var title = childSnapshot.child("title").val();
			document.getElementById("title_text").innerHTML = title;


		});
	});




	var storageRef = firebase.storage().ref();
	var spaceRef = storageRef.child('promotions/'+key+'.jpg');
	storageRef.child('promotions/'+key+'.jpg').getDownloadURL().then(function(url) {
		var test = url;
		document.getElementById('image1').src = url;


	}).catch(function(error) {

	});


}
