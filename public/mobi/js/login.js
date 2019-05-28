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
		alert("LOGIN FAILED : " + error.message);
		window.location= "login.html";
	});



	function myFunction2(email) {
		myVar = setTimeout(window.location= "index.html", 1000);
	}
}



window.onload = function(){
	document.getElementById("loading").style.display = 'none';
}





function SendEmailOnClick(){


	var emailAddress = document.getElementById('InputEmail').value;

	console.log(emailAddress);

	var auth = firebase.auth();

	auth.sendPasswordResetEmail(emailAddress).then(function() {

		alert("Send email, Please check you inbox");
		window.location= "login.html";


	}).catch(function(error) {

		alert(error.message);
	});



}