function submit(){
    var email = document.getElementById("inputEmail").value;

    // console.log(email);

    var ref = firebase.database().ref("Ticket");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function(data) {
        //   console.log(data.key);
        //   var id = data.key;
          // document.getElementById("p2").innerHTML = data.key;
          edit(data.key);
      });
    });

    function edit(id){
        var issue = document.getElementById("inputIssue").value;
        var valid = document.getElementById("inputValid").value;
        var ref = firebase.database().ref("Ticket");
        ref.child(id)
        .update({ issue: issue, valid: valid });
        alert("Edit Complete!");
    }



}