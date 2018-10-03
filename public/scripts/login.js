function signInOnClick(){
	var email = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
	
// 	firebase.auth().signInWithEmailAndPassword(email, password)

//     .catch(function(error) {

//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//     alert('Wrong password.');
    
//   } else {
    
    
//   }
//   console.log(error);

// });





      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(authData) {
          auth = authData;
          // $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          // $('#messageModal').modal('hide');
          console.log("LOGIN SUCCES");
          alert("LOGIN SUCESS");
          myFunction();
        })
        .catch(function(error) {
          console.log("Login Failed!");
          console.log(error.code);
          alert("LOGIN FAILED : " + error.code);
          // $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
        });
 









var myVar;

function myFunction() {
  firebase.auth().onAuthStateChanged(function(user) {
    myFunction2();
  });



    
}
function myFunction2() {
  myVar = setTimeout(alertFunc, 700);
  }


function alertFunc() {
    
    window.location= "home.html";
}

}








	





