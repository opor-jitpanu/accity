function  submitOnClick() {
	var count = 0;
	var time = 1;
	

	var email = document.getElementById('inputEmail').value;
	


	var ref = firebase.database().ref("Checkin");
	ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			ref.child(data.key).remove();
		});
		alert("Delete Complete");

	});



	



}

