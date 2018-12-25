window.onload = function(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var point = url.searchParams.get("point");



	firebase.auth().onAuthStateChanged(function(user) {

		FindID(user.email);
	});

	function FindID(email){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				UpdatePoint(data.key);
			});
		});

	}

	

	function UpdatePoint(id){
		var ref = firebase.database().ref("User");
		ref.child(id)
		.update({ point: point
		});
		document.getElementById("point").innerHTML = "Your current point : " + point;




		firebase.auth().onAuthStateChanged(function(user) {

			var firebaseRef = firebase.database().ref("Code");
			var firebasea = firebaseRef.push({
				email:user.email,
				status:'stanby'
			});

			console.log(firebasea.name());

			
		});

	}

}