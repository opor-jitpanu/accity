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
      document.getElementById("p_firstname").innerHTML = "Firstname : "+capitalizeFirstLetter(firstname);
    });
    ref.once("value")
    .then(function(snapshot){
      var lastname = snapshot.child(id).child("lastname").val();
      document.getElementById("p_lastname").innerHTML = "Lastname : "+capitalizeFirstLetter(lastname);
    });
    ref.once("value")
    .then(function(snapshot){
      var tel = snapshot.child(id).child("tel").val();
      document.getElementById("p_tel").innerHTML = "Telephone : "+tel;
    });
    ref.once("value")
    .then(function(snapshot){
      var birth = snapshot.child(id).child("birth").val();
      document.getElementById("p_birth").innerHTML = "Birth : "+birth;
    });
    $('#loading').hide();
    
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }




}


function showTicket(){
  $('#loading').show();
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
            document.getElementById("p_issue").innerHTML = "Issue : "+issue;
          });
    ref.once("value")
    .then(function(snapshot){
      var valid = snapshot.child(id).child("valid").val();
            // console.log(issue);
            document.getElementById("p_valid").innerHTML = "Valid : "+valid;
            $('#loading').hide();
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
      var today_in = new Date();
      var dd_in = today_in.getDate();
      var mm_in = today_in.getMonth()+1; //January is 0!
      var yyyy_in = today_in.getFullYear();

      if(dd_in<10) {
        dd_in = '0'+dd_in;
      } 

      if(mm_in<10) {
        mm_in = '0'+mm_in;
      } 

      date_in = dd_in + '/' + mm_in + '/' + yyyy_in;

      var d_in = new Date(); // for now
      var hour_in = d_in.getHours(); // => 9
      var minute_in = d_in.getMinutes(); // =>  30
      
      if (minute_in < 10) {
        minute_in = '0' + minute_in;
      }

      var time_in = hour_in + ":" + minute_in;

      var ref = firebase.database().ref("Time");
      ref.child(id)
      .update({ date: date_in,
       time_in: time_in
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
      var today_out = new Date();
      var dd_out = today_out.getDate();
      var mm_out = today_out.getMonth()+1;
      var yyyy_out = today_out.getFullYear();

      if(dd_out<10) {
        dd_out = '0'+dd_out;
      } 

      if(mm_out<10) {
        mm_out = '0'+mm_out;
      } 

      date_out = dd_out + '/' + mm_out + '/' + yyyy_out;

      var d_out = new Date(); // for now
      var hour_out = d_out.getHours(); // => 9
      var minute_out = d_out.getMinutes(); // =>  30

      if (minute_out < 10) {
        minute_out = '0' + minute_out;
      }

      var time_out = hour_out + ":" + minute_out;

      var ref = firebase.database().ref("Time");
      ref.child(id)
      .update({ 
       time_out: time_out
     });

      // alert("Time OUT = " + time);
    }
    alert("Time out Complete!");


  }








