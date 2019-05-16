


function loginOnclick(){


	var username = document.getElementById('inputUsername').value;
	var password = document.getElementById('inputPassword').value;


	if (username == "admin" && password == "1234") {


		sessionStorage.setItem("login", "yes");

		firebase.auth().signInWithEmailAndPassword('staff_accity@gmail.com', 'jitpanu123')
		.then(function(authData) {
			auth = authData;
			console.log("LOGIN SUCCES");
			window.location.href = "index.html";
			

		})
		.catch(function(error) {
			console.log("Login Failed!");
			
		});


	}else {
		alert("Wrong username or password")
		sessionStorage.setItem("login", "no");
		window.location.href = "login.html";
	}


	

}



