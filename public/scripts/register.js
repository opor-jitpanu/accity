window.onload = function(){
	
	
}


function saveRegisterOnClick() {
	// console.log("opor");
	var firstname = document.getElementById('InputFirstname');
	var lastname = document.getElementById('InputLastname');
	var email = document.getElementById('InputEmail');
	var password = document.getElementById('InputPassword');
	var sex = document.getElementById('InputSex').value;

	if (document.getElementById('radio1').checked) {
  		sex_value = document.getElementById('radio1').value;
	}else if (document.getElementById('radio2').checked){
		sex_value = document.getElementById('radio2').value;
	}

	var country = document.getElementById('InputCountry').value;
	// console.log(country);

	// var rates = document.getElementById('rates').value;


	insertData(firstname.value,lastname.value, email.value, password.value, sex_value, country);


	// console.log(firstname.value, lastname.value, email.value, username.value, password.value );

	// console.log(firstname.value,lastname.value, email.value, password.value, sex_value);
	// console.log(rate_value);
}

function insertData(firstname, lastname, email, password, sex, country){
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		firstname:firstname,
		lastname:lastname,
		email:email,
		password:password,
		sex:sex,
		point:'0',
		country:country
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
	myFunction();


	var myVar;

	function myFunction() {
	    myVar = setTimeout(alertFunc, 2000);
	}

	function alertFunc() {
	    
	    window.location= "index.html";
	}



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

