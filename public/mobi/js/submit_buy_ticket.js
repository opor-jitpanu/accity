window.onload = function(){
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var t1 = url.searchParams.get("t1");
	var t2 = url.searchParams.get("t2");
	var sum = url.searchParams.get("sum");

	


	firebase.auth().onAuthStateChanged(function(user) {
		
		if (user) {

			

			

			
			console.log("Login")
			var ref = firebase.database().ref("User");
			ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					var id = data.key;

					ref.once("value")
					.then(function(snapshot){
						var firstname = snapshot.child(id).child("firstname").val();
						var lastname = snapshot.child(id).child("lastname").val();

						document.getElementById("name").innerHTML = "Name : "+firstname +"  "+ lastname;
						document.getElementById("email").innerHTML = "Email : "+user.email;

						document.getElementById("ticket").innerHTML = "Daily Ticket : " + t1;
						document.getElementById("ticket2").innerHTML = "Yearly Ticket : " + t2;
						document.getElementById("sum").innerHTML = "Total : " + sum + " ฿";




					});
				});
			});

			




		} else {
			console.log("Not Login");
			window.location.href = "login.html";
		}
	});





}