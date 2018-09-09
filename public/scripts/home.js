window.onload = function(){
	// showData();
	showData2();
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