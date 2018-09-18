window.onload = function(){
	
	
}


function saveRegisterOnClick() {
	// console.log("opor");
	var firstname = document.getElementById('InputFirstname');
	var lastname = document.getElementById('InputLastname');
	var email = document.getElementById('InputEmail');
	var password = document.getElementById('InputPassword');
	var sex = document.getElementById('InputSex').value;
	var tel = document.getElementById('InputTelephone');

	if (document.getElementById('radio1').checked) {
  		sex_value = document.getElementById('radio1').value;
	}else if (document.getElementById('radio2').checked){
		sex_value = document.getElementById('radio2').value;
	}

	var country = document.getElementById('InputCountry').value;

	var day = document.getElementById('InputBirthDay').value;
	var month = document.getElementById('InputBirthMonth').value;
	var year = document.getElementById('InputBirthYear').value;

	var birth = day+' '+month+' '+year;
	// console.log(birth);

	// console.log(country);

	// var rates = document.getElementById('rates').value;
	console.log(password.value.length);

	if (password.value.length >= 6) {
		console.log("yes");
		insertData(firstname.value,lastname.value, email.value, password.value, sex_value, country, tel.value, birth);
		
	}else{
		console.log("no");
		alert("Your password is too short. (Must be at least 6 characters.)");
	}
	// ๒๒๒insertData(firstname.value,lastname.value, email.value, password.value, sex_value, country, tel.value, birth);


	// console.log(firstname.value, lastname.value, email.value, username.value, password.value );

	// console.log(firstname.value,lastname.value, email.value, password.value, sex_value);
	// console.log(rate_value);
}

function insertData(firstname, lastname, email, password, sex, country, tel, birth){
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		firstname:firstname,
		lastname:lastname,
		email:email,
		password:password,
		sex:sex,
		point:'0',
		country:country,
		tel:tel,
		birth:birth
	});
	var firebaseRef2 = firebase.database().ref("Ticket");
	firebaseRef2.push({
		email:email,
		valid:'-',
		issue:'-'
	});
	console.log("Insert to Database Success");
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

