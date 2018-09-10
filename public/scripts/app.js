function saveOnClick() {
	// console.log("opor");
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var address = document.getElementById('address');
	insertData(email.value, password.value, address.value);
}


function registerOnClick(){
	window.location.href = "register.html";
}

function loginOnClick(){
	window.location.href = "login.html";
}

window.onload = function(){


	firebase.auth().onAuthStateChanged(function(user) {
  // console.log('oo');

  console.log(user);
  // document.getElementById("p1").innerHTML = user.uid;
});


	
	showData();

	
}

function showData(){
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.once('value').then(function(dataSnapshot){
		dataSnapshot.forEach(function(childSnapshot){
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			console.log(childData);
		})
		
	});
}
function insertData(email,password,address){
	var firebaseRef = firebase.database().ref("User");
	firebaseRef.push({
		email:email,
		password:password,
		address:address
	});
	console.log("Insert Success");
}



