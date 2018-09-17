window.onload = function(){


  firebase.auth().onAuthStateChanged(function(user) {
    // console.log('oo');
    // console.log(user.email);
    // document.getElementById("p1").innerHTML = user.email;
    var url = 'https://barcode.tec-it.com/barcode.ashx?data=' + user.email + '&code=Code128&dpi=96&dataseparator=';
      $('#barcode2').attr('src', url);
  });


  document.getElementById("code").innerHTML = "Qr Code";
	// showData();
	// showData2();
  // showData();
  var x = document.getElementById("ticket");
  x.style.display = "none";
  var z = document.getElementById("history");
  z.style.display = "none";
  showInformation();


  firebase.auth().onAuthStateChanged(function(user) {
    // console.log('oo');
    // console.log(user.email);
    // document.getElementById("p1").innerHTML = user.email;
    showId(user.email);
  });

  function showId(email){
  var ref = firebase.database().ref("User");
  ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        // document.getElementById("p2").innerHTML = data.key;
        showPoint(data.key);
    });
  });
  
  }
  function showPoint(id){
  var ref = firebase.database().ref("User");
  ref.once("value")
      .then(function(snapshot){
        var point = snapshot.child(id).child("point").val();
        document.getElementById("p5").innerHTML = point;
    });
    
    
  }

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

// function showData(){



//   firebase.auth().onAuthStateChanged(function(user) {
//   // console.log('oo');

//   // console.log(user.email);
//   // document.getElementById("p1").innerHTML = user.email;
//   showId(user.email);

// });


  

  // var ref = firebase.database().ref("User");
  // ref.once("value")
  //   .then(function(snapshot){
  //     var firstname = snapshot.child("-LLtkcGZxjgTqcAI9Yom").child("firstname").val();
  //     console.log(firstname);
  // });

  




// }

// function showId(email){
//   var ref = firebase.database().ref("User");
//   ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
//     // console.log(snapshot.val());
//     snapshot.forEach(function(data) {
//         // console.log(data.key);
//         var id = data.key;
//         // document.getElementById("p2").innerHTML = data.key;
//         showPoint(data.key);
//     });
//   });
  
// }



// function showPoint(id){
//   var ref = firebase.database().ref("User");
//     ref.once("value")
//       .then(function(snapshot){
//         var firstname = snapshot.child(id).child("firstname").val();
//         // document.getElementById("p3").innerHTML = firstname;
//     });

//     ref.once("value")
//       .then(function(snapshot){
//         var lastname = snapshot.child(id).child("lastname").val();
//         // document.getElementById("p4").innerHTML = lastname;
//     });

//       ref.once("value")
//       .then(function(snapshot){
//         var point = snapshot.child(id).child("point").val();
//         // document.getElementById("p5").innerHTML = point;
//     });
//       ref.once("value")
//       .then(function(snapshot){
//         var point = snapshot.child(id).child("tel").val();
//         // document.getElementById("p_tel").innerHTML = point;
//     });
// }


function changeCode(){
  if(document.getElementById("code").innerHTML == "Qr Code"){
    document.getElementById("code").innerHTML = "Bar Code";
    
  }

}



function showInformation(){
    var x = document.getElementById("information");
    x.style.display = "block";
    var y = document.getElementById("ticket");
    y.style.display = "none";
    var z = document.getElementById("history");
  z.style.display = "none";

  firebase.auth().onAuthStateChanged(function(user) {
    // console.log('oo');
    // console.log(user.email);
    // document.getElementById("p1").innerHTML = user.email;
    var nric = $('#text').val();
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + user.email + '&amp;size=50x50';
      $('#barcode').attr('src', url);
    showId(user.email);
  });

  function showId(email){
  var ref = firebase.database().ref("User");
  ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        // document.getElementById("p2").innerHTML = data.key;
        showPoint(data.key);
    });
  });
  }

  function showPoint(id){
  var ref = firebase.database().ref("User");
  ref.once("value")
      .then(function(snapshot){
        var firstname = snapshot.child(id).child("firstname").val();
        document.getElementById("p_firstname").innerHTML = firstname;
    });
    ref.once("value")
      .then(function(snapshot){
        var lastname = snapshot.child(id).child("lastname").val();
        document.getElementById("p_lastname").innerHTML = lastname;
    });
    ref.once("value")
      .then(function(snapshot){
        var tel = snapshot.child(id).child("tel").val();
        document.getElementById("p_tel").innerHTML = tel;
    });
    ref.once("value")
      .then(function(snapshot){
        var birth = snapshot.child(id).child("birth").val();
        document.getElementById("p_birth").innerHTML = birth;
    });
    
  }




}


function showTicket(){
  var y = document.getElementById("ticket");
  y.style.display = "block";
  var x = document.getElementById("information");
  x.style.display = "none";
  var z = document.getElementById("history");
  z.style.display = "none";

  firebase.auth().onAuthStateChanged(function(user) {
    // console.log(user.email);
    showId(user.email);
  });
  function showId(email){
    var ref = firebase.database().ref("Ticket");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          var id = data.key;
          // console.log(data.key);
          showPoint(data.key);
      });
    });
    }

    function showPoint(id){
      var ref = firebase.database().ref("Ticket");
      ref.once("value")
          .then(function(snapshot){
            var issue = snapshot.child(id).child("issue").val();
            // console.log(issue);
            document.getElementById("p_issue").innerHTML = issue;
        });
        ref.once("value")
          .then(function(snapshot){
            var valid = snapshot.child(id).child("valid").val();
            // console.log(issue);
            document.getElementById("p_valid").innerHTML = valid;
        });
         
      }

}


function showHistory(){
  var z = document.getElementById("history");
  z.style.display = "block";
  // y.style.display = "none";
    var x = document.getElementById("information");
  x.style.display = "none";
  var y = document.getElementById("ticket");
    y.style.display = "none";
  
}


function logoutOnClick(){
  firebase.auth().signOut();
  window.location = 'index.html';

}









