function signInOnClick(){
	var email = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
	
	firebase.auth().signInWithEmailAndPassword(email, password)

    .catch(function(error) {
// Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
    
  } else {
    // alert(errorMessage);
    
  }
  console.log(error);





});





firebase.auth().onAuthStateChanged(function(user) {
	// console.log('oo');

  // console.log(user);
  // var timer1 =setTimeout(run, 3000);
 	// window.location= "home.html";



 	myFunction();

});


var myVar;

function myFunction() {
    myVar = setTimeout(alertFunc, 2500);
}

function alertFunc() {
    
    window.location= "home.html";
}





}






	





