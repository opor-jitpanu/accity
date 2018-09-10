// (function () {
// 	// firebase
// 	const config = {
//     apiKey: "AIzaSyBWIHGQeMHHyZErBFXSXsVP3OaIQV8tx4I",
//     authDomain: "ancientcity-5c152.firebaseapp.com",
//     databaseURL: "https://ancientcity-5c152.firebaseio.com",
//     projectId: "ancientcity-5c152",
//     storageBucket: "ancientcity-5c152.appspot.com",
//     messagingSenderId: "44267136823"
//   };
//   firebase.initializeApp(config);

//   const txtEmail = document.getElementById('txtEmail');
//   const txtPassword = document.getElementById('txtPassword');
//   const btnLogin = document.getElementById('btnLogin');
//   const btnSignup = document.getElementById('btnSignup');
//   console.log("opor2");


//   btnLogin.addEventListener('click', e=>{
//   	console.log("opor");
//   	const email = txtEmail.value;
//   	const pass = txtPassword.value;
//   	const auth = firebase.auth();
//   	//Sign in
//   	const promise = auth.signInWithEmailAndPassword(email, pass);
//   	promise.catch(e => console.log(e.message));
//   });


// });



function loginOnClick(){
	const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const email = txtEmail.value;
  const pass = txtPassword.value;
  console.log("opor2");
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));

  	
}