
window.onload = function(){





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
		});
	}





	

	
	var countDiv = 1;

	var userDataRef = firebase.database().ref("Reward");
	userDataRef.once("value").then(function(snapshot) {

		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var id = childSnapshot.val().id;
			var name = childSnapshot.val().name;
			var point = childSnapshot.val().point;
			var description = childSnapshot.val().description;


			var x = document.getElementById("name_reward" + id);
			x.innerHTML = name;

			var y = document.getElementById("description" + id);
			y.innerHTML = description;

			var z = document.getElementById("point" + id);
			z.innerHTML = "Point : " + point;

			var btn = document.getElementById("btnlink" + id);
			btn.innerHTML ='<center><a href="reward_show.html?id='+id+'"><button class="btn btn-primary">More Information</button></a><center>';

			document.getElementById('image'+id).src = 'images/reward/' + id +'.jpg';
			console.log(id);


			countDiv += 1;




		});
		


	});

	// var distance2 = parseInt(sortedCities[0][1]);
	// var check  = '';
	// if (distance2 < 300) {
	// 	check = 'yes';
	// }else if(distance2 >= 301){
	// 	check = 'no';
	// }
	// showImage(sortedCities[0][0],1);
	// showNamePlace(sortedCities[0][0], 1);
	// var x2 = document.getElementById("btnlink1");
	// x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[0][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

}