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



function submitMaleOnClick(){
	var count = 0;
	var time = 1;

	var male = 0;
	var female = 0;
	

	var place_id = document.getElementById('inputPlaceid2').value;
	


	var ref = firebase.database().ref('Checkin');
	var ref2 = firebase.database().ref('User');
	ref
	.orderByChild('location')
	.equalTo(place_id)
	.on('child_added', function(snapshot) { 
		var user = snapshot.val();

		email = user.email;
		
		ref2.orderByChild('email')
		.equalTo(email)
		.on('child_added', function(snapshot) { 

			var user2 = snapshot.val();
			sex = user2.sex;
			console.log(sex);
			if (sex == 'male') {
				male += 1;
			}else if(sex == "female"){
				female += 1;
			}

			document.getElementById("male_text").innerHTML = "Male : " + male;
			document.getElementById("female_text").innerHTML = "Female : " + female;

		});
		console.log(email);
		count += 1;

		document.getElementById("text_count").innerHTML = "Place ID : " + place_id + " --> " + count;

	});
}