function  submitOnClick() {
	var count = 0;
	var time = 1;
	

	var place_id = document.getElementById('inputPlaceid').value;
	


	var ref = firebase.database().ref('Checkin');
	ref
	.orderByChild('location')
	.equalTo(place_id)
	.on('child_added', function(snapshot) { 
		var user = snapshot.val();

		time = user.time_checkin



		
		console.log(user.time_checkin);
		count += 1;
		
		

		document.getElementById("text_count").innerHTML = "Place ID : " + place_id + " --> " + count;

	});



	



}

