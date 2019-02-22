
window.onload = function(){

	var mydiv = document.getElementById('list');



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
			var point = snapshot.child(id).child("point_all").val();
			document.getElementById("point").innerHTML = "Your Points : "+point;
		});
	}





	

	
	

	var userDataRef = firebase.database().ref("User");
	var storageRef = firebase.storage().ref();
	userDataRef.once("value").then(function(snapshot) {
		

		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			
			var point = childSnapshot.val().point_all;
			var firstname = childSnapshot.val().firstname;
			var lastname = childSnapshot.val().lastname;











			
				console.log(firstname +" "+ lastname + " : " + point);

			


			var div = '';

			mydiv.innerHTML += div;


			document.getElementById("loading").style.display = 'none';


			



		});

		

	});











}