function signInOnClick(){
	var email = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
  var id;
  showId(email,password);
}

  function showId(email,password){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        console.log("ID1 : " + id);
        checkState(id, email, password);
        // document.getElementById("p2").innerHTML = data.key;
        
        // alert(data.key);
      });
  });
    // checkState(id);
    // console.log("ID : " + id);
  }


  function checkState(id, email, password){
    console.log("CHECK");
    var ref = firebase.database().ref("User");
    ref.once("value")
    .then(function(snapshot){
      var point = snapshot.child(id).child("login").val();
      console.log("Point : " + point);
      if (point == 'no') {
        // alert("NO");
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
      alert("LOGIN SUCESS");
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
















