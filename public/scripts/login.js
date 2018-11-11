window.onload = function(){
  document.getElementById("loading").style.display = "none";
}

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
      .update({ login:'no' }); //YES //yes
      alertFunc(email)
    });
  });

}




function alertFunc(email) {

  var countTicketStanby = 0;
  var countTicketActivated = 0;
  var ref = firebase.database().ref("User");
  var userDataRef = firebase.database().ref("Ticket");


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


  userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {

    snapshot.forEach(function(childSnapshot) {


      var status = childSnapshot.val().status;

      var date_in = childSnapshot.val().date_in;


      if (date_in == today || status == "stanby") {

        if (status == "stanby") {

          countTicketStanby += 1;

        }else if (status == "activated") {
          countTicketActivated += 1;
        }

      }
      

    });


    if (countTicketActivated > 0) {
      window.location= "checkin.html";
    }else if (countTicketStanby > 0) {
      window.location= "use_ticket.html";
    }else{
      window.location= "buy_ticket.html";
    }
    console.log(countTicketStanby);
    console.log(countTicketActivated);

  });





}
















