function AddPromotionOnClick() {
	var title = document.getElementById('titlePromotion').value;
	var des1 = document.getElementById('descriptionPromotion1').value;
	var des2 = document.getElementById('descriptionPromotion2').value;
	var date_in2 = document.getElementById("inpuInDate").value;
	var date_out2 = document.getElementById("inpuOutDate").value;







	var date_in = date_in2;
	var year_in = date_in.charAt(0) + date_in.charAt(1) + date_in.charAt(2) + date_in.charAt(3);
	var month_in = date_in.charAt(5) + date_in.charAt(6);
	var day_in = date_in.charAt(8) + date_in.charAt(9); 
	var date_in = day_in + "/" + month_in + "/" + year_in;

	

	var date_out = date_out2;
	var year_out = date_out.charAt(0) + date_out.charAt(1) + date_out.charAt(2) + date_out.charAt(3);
	var month_out = date_out.charAt(5) + date_out.charAt(6);
	var day_out = date_out.charAt(8) + date_out.charAt(9); 
	var date_out = day_out + "/" + month_out + "/" + year_out;













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

			insertData(title, des1, des2, key, date_in, date_out);
		});
		
		
	}


}


function insertData(title, des1, des2, key, date_in, date_out){

	var key2 = key.toString();
	firebase.database().ref("Promotion").push({
		title:title,
		description1:des1,
		description2:des2,
		id:key2,
		date_in:date_in,
		date_out:date_out
	}, function(error) {
		if (error) {
			alert(error);
		} else {
			window.location= "promotion.html";
		}
	});
	
	
}





