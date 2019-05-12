window.onload = function(){

	// document.getElementById("logout_btn").children[1].style.display="none";
	// document.getElementById("logout_btn").children[2].style.display="none";
	// document.getElementById("logout_btn").children[7].style.display="none";

	firebase.auth().onAuthStateChanged(function(user) {
		// var email = user.email;
		// console.log(email);
		if (user) {

			

			

			
			console.log("Login")
			var ref = firebase.database().ref("User");
			ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					var id = data.key;

					ref.once("value")
					.then(function(snapshot){
						var firstname = snapshot.child(id).child("firstname").val();

						document.getElementById("name_hi").innerHTML = firstname;



					});
				});
			});

			




		} else {
			console.log("Not Login");
			window.location.href = "login.html";
		}
	});

}