function signInOnClick(){
  document.getElementById("loading").style.display = "block";
	var email = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
  var id;
  showId(email,password);
}

  function showId(email,password){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

    snapshot.forEach(function(data) {
        var id = data.key;
        console.log("ID1 : " + id);
        checkState(id, email, password);

      });
  });

  }


  function checkState(id, email, password){
    console.log("CHECK");
    var ref = firebase.database().ref("User");
    ref.once("value")
    .then(function(snapshot){
      var point = snapshot.child(id).child("login").val();
      console.log("Point : " + point);
      if (point == 'no') {
        login1(email, password);
        
      }else{
        alert("You can't login!");
        
      }
    });
    
    
  }



  function login1(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(authData) {
      auth = authData;
      console.log("LOGIN SUCCES");
      // alert("LOGIN SUCESS");
      myFunction(email);
    })
    .catch(function(error) {
      console.log("Login Failed!");
      console.log(error.code);
      alert("LOGIN FAILED : " + error.code);
    });
  }





  var myVar;

  function myFunction(email) {
    firebase.auth().onAuthStateChanged(function(user) {
      myFunction2(email);
    });

  }


  function myFunction2(email) {
    myVar = setTimeout(editLogin(email), 700);
  }


function editLogin(email){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          ref.child(data.key)
          .update({ login:'yes' });
          alertFunc()
        });
    });

  }




  function alertFunc() {

    window.location= "home.html";
  }

window.onload = function(){
  document.getElementById("loading").style.display = "none";
}














