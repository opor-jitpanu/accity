window.onload = function(){
	// showData();
	// showData2();
  showData3();
}


function showData(){
	var firebaseRef = firebase.database().ref("User");
	
	firebaseRef.orderByChild('firstname').equalTo('jitpanu').on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        console.log(data.key);
    });
});
}


function showData2(){
	 // Get the root of FireBase
   var root = firebase.database().ref();

   // Query the Films node under it
   var query = root.child("User");

   // Get a snapshot containing the matching children from under Films
   query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val().firstname);
      });
   });
}

function showData3(){
  firebase.auth().onAuthStateChanged(function(user) {
  // console.log('oo');

  console.log(user.email);
  document.getElementById("p1").innerHTML = user.email;
});

}






function logoutOnClick(){
  firebase.auth().signOut();
  window.location = 'index.html';

}