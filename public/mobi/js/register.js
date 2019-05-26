window.onload = function(){
	document.getElementById("loading").style.display = 'none';

	
}



function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}


function saveRegisterOnClick() {
	
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
	

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;



	console.log('1123');

	if (!firstname.value || !lastname.value || !email.value || !password.value || !tel.value) {
		console.log('Null');
		alert('Please Check Information');
	}else{

		var ref = firebase.database().ref("User");
		ref.orderByChild("email").equalTo(email.value).once("value",snapshot => {
			if (snapshot.exists()){

				console.log("exists!");
				alert('The email address is already in use by another account.');
				window.location.href = "register.html";
			}else{
				
				console.log('NULLLLL');
				if (password.value.length >= 6) {
					console.log("yes");


					if (validateEmail(email.value)) {

						insertData(firstname.value,lastname.value, email.value, password.value, sex_value, country, tel.value, birth, today);
					} else {
						alert("Invalid email format");
					}


				}else{
					console.log("no");
					alert("Your password is too short. (Must be at least 6 characters.)");
				}

			}
		});


	}
}




function insertData(firstname, lastname, email, password, sex, country, tel, birth, today){
	document.getElementById("loading").style.display = 'block';

	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		firstname:firstname,
		lastname:lastname,
		email:email,
		password:password,
		sex:sex,
		point:'0',
		point_all:0,
		country:country,
		tel:tel,
		birth:birth,
		login:'no'
	});
	// var firebaseRef2 = firebase.database().ref("Ticket");
	// firebaseRef2.push({
	// 	email:email,
	// 	valid:'-',
	// 	issue:'-'
	// });

	var firebaseRef3 = firebase.database().ref("Time");
	firebaseRef3.push({
		date:'-',
		email:email,
		time_in:'-',
		time_out:'-'
	});

	var firebaseRef5 = firebase.database().ref("Treasure");
	firebaseRef5.push({
		email:email,
		one:'lock',
		two:'lock',
		three:'lock',
		four:'lock',
		five:'lock'
	});

	var firebaseRef4 = firebase.database().ref("Checkin");
	firebaseRef4.push({
		email:email,
		date:'-',
		location:'-',
		time_checkin:'-'
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
				// alert('The password is too weak');

			}else{
				// alert('errorMessage');
			}
			console.log(error);
		});
	myFunction();


	var myVar;

	function myFunction() {
		myVar = setTimeout(alertFunc, 2000);
	}

	function alertFunc() {

		signIn();
	}



}



function signIn(){
	var email = document.getElementById('InputEmail').value;
	var password = document.getElementById('InputPassword').value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		if(errorCode === 'auth/wrong-password'){
			console.log('wrong-password');
		}else{
			console.log(errorMessage);
		}
		console.log(error);
	});



	sendEmail();

	

}




function sendEmail(){




	firebase.auth().onAuthStateChanged(function(user) {

		

		emailVerified = user.emailVerified;

		console.log(emailVerified);


		var user = firebase.auth().currentUser;

		user.sendEmailVerification().then(function() {
			console.log('send');
		}).catch(function(error) {
			console.log(error);
		});

		alert('Please Vertify this Email');
		window.location.href = "index.html";
		




		
	});




	
}























