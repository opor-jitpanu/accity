
window.onload = function(){



  firebase.auth().onAuthStateChanged(function(user) {


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
            document.getElementById("firstlastname").innerHTML = firstname + ' '+lastname;
            document.getElementById("tel").innerHTML = tel;
            document.getElementById("email").innerHTML = email;
            document.getElementById("loading").style.display = "none";
          });
        });
        });
      });




    }
