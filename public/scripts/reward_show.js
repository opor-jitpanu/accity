window.onload = function(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var id2 = url.searchParams.get("id");


	firebase.auth().onAuthStateChanged(function(user) {

		showId(user.email);
	});

	function showId(email){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

			snapshot.forEach(function(data) {

				var id = data.key;

				showPoint(data.key);
			});
		});

	}
	function showPoint(id){
		var ref = firebase.database().ref("User");
		ref.once("value")
		.then(function(snapshot){
			var point = snapshot.child(id).child("point").val();
			document.getElementById("point").innerHTML = "My point "+point;
			showInfo(id2, point);
		});
	}

	
	

}


function showInfo(id, curPoint){
	var ref = firebase.database().ref("Reward");
	ref.once("value")
	.then(function(snapshot){

		var name = snapshot.child(id).child("name").val();
		document.getElementById("name_head").innerHTML = name;

		var description = snapshot.child(id).child("description").val();
		document.getElementById("description_txt").innerHTML = description;

		var point = snapshot.child(id).child("point").val();
		document.getElementById("point2_txt").innerHTML = "Point : " + point;
		checkPoint(curPoint, point);

	});
}


function checkPoint(curPoint, point){

	console.log(curPoint);
	console.log(point);

	if (curPoint < point) {
		document.getElementById("btnCheckin").style.display = "none";
	}

	document.getElementById("loading").style.display = "none";


}






function getRewardOnClick(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var id2 = url.searchParams.get("id");


	firebase.auth().onAuthStateChanged(function(user) {

		showId(user.email);
	});

	function showId(email){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

			snapshot.forEach(function(data) {

				var id = data.key;

				showPoint(data.key);
			});
		});

	}
	function showPoint(id){
		var ref = firebase.database().ref("User");
		ref.once("value")
		.then(function(snapshot){
			var point = snapshot.child(id).child("point").val();
			document.getElementById("point").innerHTML = "My point "+point;
			getPoint(id2, point);
		});
	}


}

function getPoint(id, curPoint){
	var ref = firebase.database().ref("Reward");
	ref.once("value")
	.then(function(snapshot){
		var point = snapshot.child(id).child("point").val();
		cutpoint(curPoint, point);


	});
}


function cutpoint(curPoint, point){

	console.log(curPoint);
	console.log(point);

	console.log(curPoint-point);

	window.location.href = "reward_code.html?point="+(curPoint-point);


}




