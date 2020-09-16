
window.onload = function(){

	var mydiv = document.getElementById('list');



	// firebase.auth().onAuthStateChanged(function(user) {

	// 	showId(user.email);
	// });

	// function showId(email){
	// 	var ref = firebase.database().ref("User");
	// 	ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

	// 		snapshot.forEach(function(data) {

	// 			var id = data.key;

	// 			showPoint(data.key);
	// 		});
	// 	});

	// }
	// function showPoint(id){
	// 	var ref = firebase.database().ref("User");
	// 	ref.once("value")
	// 	.then(function(snapshot){
	// 		var point = snapshot.child(id).child("point_all").val();
	// 		document.getElementById("point").innerHTML = "Your Accumulative Points : "+point;
	// 	});
	// }





	

	
	

	// var userDataRef = firebase.database().ref("User");
	// var storageRef = firebase.storage().ref();
	// userDataRef.once("value").then(function(snapshot) {
		

	// 	snapshot.forEach(function(childSnapshot) {

	// 		var key = childSnapshot.key;
	// 		var childData = childSnapshot.val();


	// 		var point = childSnapshot.val().point_all;
	// 		var firstname = childSnapshot.val().firstname;
	// 		var lastname = childSnapshot.val().lastname;












	// 		// console.log(firstname +" "+ lastname + " : " + point);




	// 		var div = '';

	// 		mydiv.innerHTML += div;


	// 		document.getElementById("loading").style.display = 'none';






	// 	});



	// });





	firebase.auth().onAuthStateChanged(function(user) {



		document.getElementById("loading").style.display = 'none';

		const query = firebase.database().ref('User')
		.orderByChild('point_all')
		.limitToLast(10)

		query.once('value', function (snapshot) {
			var count = 10;
			var count3 = 10;
			snapshot.forEach(function (childSnapshot) {

				var firstname = childSnapshot.val().firstname;
				var lastname = childSnapshot.val().lastname;
				var point_all = childSnapshot.val().point_all;
				var email = childSnapshot.val().email;




				if (user.email == email) {
					document.getElementById("name" + count).innerHTML = " ME : " + firstname +" "+ lastname;
					document.getElementById("place" + count).innerHTML = "Score : " + point_all;
					document.getElementById("name" + count).style.color = "#455dfe";
					document.getElementById("place" + count).style.color = "#455dfe";
					document.getElementById("name" + count).style.fontWeight = "bold";
					document.getElementById("place" + count).style.fontWeight = "bold";
					document.getElementById("name" + count).style.fontSize = "x-large";
					document.getElementById("place" + count).style.fontSize = "large";

				}else{



					document.getElementById("name" + count).innerHTML = firstname +" "+ lastname;
					document.getElementById("place" + count).innerHTML = "Score : " + point_all;

				}



				count -= 1;



			});
		});

	});

}