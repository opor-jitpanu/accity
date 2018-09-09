window.onload = function(){
	
	
}


function saveRegisterOnClick() {
	// console.log("opor");
	var firstname = document.getElementById('InputFirstname');
	var lastname = document.getElementById('InputLastname');
	var email = document.getElementById('InputEmail');
	var username = document.getElementById('InputUsername');
	var password = document.getElementById('InputPassword');
	insertData(firstname.value, lastname.value, email.value, username.value, password.value );
	// console.log(firstname.value, lastname.value, email.value, username.value, password.value );
}

function insertData(firstname, lastname, email, username, password){
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		firstname:firstname,
		lastname:lastname,
		email:email,
		username:username,
		password:password
	});
	console.log("Insert Success");
	signUp();
}


function signUp(){
	var email = document.getElementById('InputEmail').value;
	var password = document.getElementById('InputPassword').value;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error)
		{
			var errorCode = error.code;
			var errorMessage = error.message;
			if(errorCode === 'auth/weak-password'){
				alert('The password is too weak');

			}else{
				alert('errorMessage');
			}
			console.log(error);
		});
}



function signIn(){
	var email = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		if(errorCode === 'auth/wrong-password'){
			alert('wrong-password');
		}else{
			alert(errorMessage);
		}
		console.log(error);
	});
	window.location.assign("home.html")
	

}

