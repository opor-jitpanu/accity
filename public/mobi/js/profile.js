
window.onload = function(){



  firebase.auth().onAuthStateChanged(function(user) {


    emailVerified = user.emailVerified;

    if (emailVerified) {


      document.getElementById('resendEmail').style.visibility = 'hidden';

    }


    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var id = data.key;

        ref.once("value")
        .then(function(snapshot){
          var firstname = snapshot.child(id).child("firstname").val();
          var lastname = snapshot.child(id).child("lastname").val();
          var email = snapshot.child(id).child("email").val();
          var tel = snapshot.child(id).child("tel").val();
          document.getElementById("name_profile").innerHTML = firstname + ' '+lastname;
          document.getElementById("tel_profile").innerHTML = tel;
          document.getElementById("email_profile").innerHTML = email;
        });
      });
    });

    var ref2 = firebase.database().ref("Time");
    ref2.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var id = data.key;

        ref2.once("value")
        .then(function(snapshot){
          var date = snapshot.child(id).child("date").val();
          var time_in = snapshot.child(id).child("time_in").val();
          document.getElementById("time_profile").innerHTML = "Last Time In : " + date +'   '+"  " + time_in;
          document.getElementById("loading").style.display = 'none';
        });
      });
    });

  });



}







function resendEmailVertify(){
  firebase.auth().onAuthStateChanged(function(user) {



    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      alert("Send ! , Please Check you inbox");
      window.location.href = "index.html";
    }).catch(function(error) {
      console.log(error);
      alert(error.code);
    });


    
  });
}