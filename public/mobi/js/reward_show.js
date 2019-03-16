window.onload = function(){



	var url_string = window.location.href;
	var url = new URL(url_string);
	var id2 = url.searchParams.get("id");
	var idd = url.searchParams.get("id2");

	
	getImage(idd);

	firebase.auth().onAuthStateChanged(function(user) {

		showId(user.email);
		checkGetcode(user.email);

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
			document.getElementById("my_point").innerHTML = "My Points : "+point;
			showInfo(id2, point);
		});
	}



	function checkGetcode(email){
		var ref = firebase.database().ref('Code');
		ref
		.orderByChild('id')
		.equalTo(id2)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			
			if (user.email == email) {
				if (user.status == 'standby') {
					var key = snapshot.key;
					// console.log(key);
					window.location.href = "reward_history_show.html?id="+key+"&check=yes";
					
				}
			}
		});
	}
	
	

}






function getImage(idd){
	console.log(idd);

	var storageRef = firebase.storage().ref();
	var spaceRef = storageRef.child('rewards/'+idd+'.jpg');
	storageRef.child('rewards/'+idd+'.jpg').getDownloadURL().then(function(url) {
		var test = url;


		document.getElementById("image1").src = test;

	}).catch(function(error) {

	});


}


function showInfo(id, curPoint){
	var ref = firebase.database().ref("Reward");
	ref.once("value")
	.then(function(snapshot){

		var name = snapshot.child(id).child("name").val();
		document.getElementById("blog_title").innerHTML = name;

		var description = snapshot.child(id).child("description").val();
		document.getElementById("description_txt").innerHTML = description;

		var point = snapshot.child(id).child("point").val();
		document.getElementById("point2_txt").innerHTML = "Require : " + point + " Points";
		document.getElementById("loading").style.display = 'none';




	});
}









function getRewardOnClick(){
	document.getElementById("loading").style.display = 'block';
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
			
			getPoint(id2, point);
		});
	}


}

function getPoint(id, curPoint){
	var ref = firebase.database().ref("Reward");
	ref.once("value")
	.then(function(snapshot){
		var point = snapshot.child(id).child("point").val();



		if (parseInt(curPoint) >= parseInt(point)) {
			cutpoint(curPoint, point, id);
		}else{
			alert("Your points are not enough.");
			document.getElementById("loading").style.display = 'none';
		}



	});
}


function cutpoint(curPoint, point, id){

	console.log(curPoint);
	console.log(point);

	console.log(curPoint-point);

	window.location.href = "reward_code.html?point="+(curPoint-point)+"&id="+id;


}




