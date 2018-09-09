function signInOnClick(){
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



