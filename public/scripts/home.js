window.onload = function(){


  firebase.auth().onAuthStateChanged(function(user) {
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


  firebase.auth().onAuthStateChanged(function(user) {
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        ref.child(data.key)
        .update({ login:'no' });
      });
    });
  });

  


  firebase.auth().signOut();
  window.location = 'index.html';

}



function checkinOnClick(){



  firebase.auth().onAuthStateChanged(function(user) {
    // console.log('oo');
    // console.log(user.email);
    // document.getElementById("p1").innerHTML = user.email;
    insertEmail(user.email);
    // alert(user.email);
  });




  // var email = document.getElementById("inputEmail").value;

    // console.log(email);

    function insertEmail(email){

      var ref = firebase.database().ref("Time");
      ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function(data) {
        //   console.log(data.key);
        //   var id = data.key;
          // document.getElementById("p2").innerHTML = data.key;

          // alert(data.key);
          edit(data.key);
        });
    });
    }

    function edit(id){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      } 

      if(mm<10) {
        mm = '0'+mm
      } 

      today = dd + '/' + mm + '/' + yyyy;

      var d = new Date(); // for now
      var hour = d.getHours(); // => 9
      var minute = d.getMinutes(); // =>  30
      
      if (minute < 10) {
        minute = '0' + minute;
      }

      var time = hour + ":" + minute;

      var ref = firebase.database().ref("Time");
      ref.child(id)
      .update({ date: today,
       time_in: time
     });
      // alert("Time IN = " + time);
      
    }
    alert("Time in Complete!");

  }




  function checkoutOnClick(){
    firebase.auth().onAuthStateChanged(function(user) {
    insertEmail2(user.email);
  });

    function insertEmail2(email){

      var ref = firebase.database().ref("Time");
      ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          edit2(data.key);
        });
    });
    }

    function edit2(id){
      var today2 = new Date();
      var dd2 = today2.getDate();
      var mm2 = today2.getMonth()+1;
      var yyyy2 = today2.getFullYear();

      if(dd2<10) {
        dd2 = '0'+dd2
      } 

      if(mm2<10) {
        mm2 = '0'+mm2
      } 

      today2 = dd2 + '/' + mm2 + '/' + yyyy2;

      var d2 = new Date(); // for now
      var hour2 = d2.getHours(); // => 9
      var minute2 = d2.getMinutes(); // =>  30

      if (minute2 < 10) {
        minute2 = '0' + minute2;
      }

      var time2 = hour2 + ":" + minute2;

      var ref = firebase.database().ref("Time");
      ref.child(id)
      .update({ date: today2,
       time_out: time2
     });

      // alert("Time OUT = " + time);
    }
    alert("Time out Complete!");

  }








