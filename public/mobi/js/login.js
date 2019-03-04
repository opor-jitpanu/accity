function signInOnClick(){


	



	document.getElementById("loading").style.display = 'block';
	
	var email = document.getElementById('email_input').value;
	var password = document.getElementById('password_input').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(authData) {
		auth = authData;
		console.log("LOGIN SUCCES");
		myFunction2(email);
	})
	.catch(function(error) {
		console.log("Login Failed!");
		console.log(error.code);
		alert("LOGIN FAILED : " + error.code);
	});



	function myFunction2(email) {
		myVar = setTimeout(window.location= "index.html", 1000);
	}
}



window.onload = function(){
	document.getElementById("loading").style.display = 'none';
}