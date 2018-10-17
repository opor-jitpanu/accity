function changeLogoutOnClick(){
    var email = document.getElementById('changeEmail').value;
    // alert(email);
    insertEmail2(email);
    function insertEmail2(email){

      var ref = firebase.database().ref("User");
      ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        // alert(data.key);
          edit2(data.key);
        });
    });
    }

    function edit2(id){
      var ref = firebase.database().ref("User");
      ref.child(id)
      .update({ login: 'no'
     });

        alert("Complete");
        window.location.href = "index_staff.html";
    }
    

  }