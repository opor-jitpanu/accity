window.onload = function(){
	// showData();
	// showData2();
  showData();
}


// function showData(){
// 	var firebaseRef = firebase.database().ref("User");
	
// 	firebaseRef.orderByChild('firstname').equalTo('jitpanu').on("value", function(snapshot) {
//     console.log(snapshot.val());
//     snapshot.forEach(function(data) {
//         console.log(data.key);
//     });
// });
// }


// function showData2(){
// 	 // Get the root of FireBase
//    var root = firebase.database().ref();

//    // Query the Films node under it
//    var query = root.child("User");

//    // Get a snapshot containing the matching children from under Films
//    query.once("value")
//       .then(function(snapshot) {
//       snapshot.forEach(function(childSnapshot) {
//         console.log(childSnapshot.val().firstname);
//       });
//    });
// }

function showData(){



  firebase.auth().onAuthStateChanged(function(user) {
  // console.log('oo');

  // console.log(user.email);
  document.getElementById("p1").innerHTML = user.email;
  showId(user.email);

});


  

  // var ref = firebase.database().ref("User");
  // ref.once("value")
  //   .then(function(snapshot){
  //     var firstname = snapshot.child("-LLtkcGZxjgTqcAI9Yom").child("firstname").val();
  //     console.log(firstname);
  // });

  




}

function showId(email){
  var ref = firebase.database().ref("User");
  ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        document.getElementById("p2").innerHTML = data.key;
        showPoint(data.key);
    });
  });
  
}



function showPoint(id){
  var ref = firebase.database().ref("User");
    ref.once("value")
      .then(function(snapshot){
        var firstname = snapshot.child(id).child("firstname").val();
        document.getElementById("p3").innerHTML = firstname;
    });

    ref.once("value")
      .then(function(snapshot){
        var lastname = snapshot.child(id).child("lastname").val();
        document.getElementById("p4").innerHTML = lastname;
    });

      ref.once("value")
      .then(function(snapshot){
        var point = snapshot.child(id).child("point").val();
        document.getElementById("p5").innerHTML = point;
    });
      ref.once("value")
      .then(function(snapshot){
        var point = snapshot.child(id).child("tel").val();
        document.getElementById("p_tel").innerHTML = point;
    });
}



function showInformation(){

    var x = document.getElementById("information");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}



function logoutOnClick(){
  firebase.auth().signOut();
  window.location = 'index.html';

}









