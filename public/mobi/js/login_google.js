// function signInOnClick(){


// 	var provider = new firebase.auth.GoogleAuthProvider();

// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 		var token = result.credential.accessToken;
// 		var user = result.user;

// 	}).catch(function(error) {
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		var email = error.email;
// 		var credential = error.credential;
// 	});



// 	// document.getElementById("loading").style.display = 'block';

// 	// var email = document.getElementById('email_input').value;
// 	// var password = document.getElementById('password_input').value;










// // var ref = firebase.database().ref("User");
// // ref.orderByChild("email").equalTo(email).once("value",snapshot => {
// // 	if (snapshot.exists()){
// // 		const userData = snapshot.val();
// // 		console.log("exists!", userData);
// // 		alert("Youe Email is Already Register");
// // 	}else{
// // 		console.log("NOO");
// // 	}
// // });




// }













window.onload = function(){
	document.getElementById("loading").style.display = 'none';

	
}