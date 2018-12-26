window.onload = function(){




	var num = 1;


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
		AddCode(point);

	}


	function AddCode(point){
		if (num == 1) {
			var firebaseRef = firebase.database().ref("Code");
			var firebasea = firebaseRef.push({
				email:'1',
				status:'stanby'
			});

			console.log(firebasea.getKey());
			document.getElementById("code").innerHTML = "Your Code : " + firebasea.getKey();
			window.location.href = "reward_code_show.html?key="+firebasea.getKey()+"&point="+point;
			num += 1;
		}
	}

}



function BackOnClick(){
	window.location.href = "reward.html";
}