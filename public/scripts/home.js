
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

    showId(user.email);
  });

  function showId(email){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

      snapshot.forEach(function(data) {

        var id = data.key;

        showPoint(data.key, email);
      });
    });

  }
  function showPoint(id, email){
    var ref = firebase.database().ref("User");
    ref.once("value")
    .then(function(snapshot){
      var point = snapshot.child(id).child("point").val();
      document.getElementById("p5").innerHTML = point;
    });
    
    showId2(email);
  }

  function showId2(email){
    
    var ref = firebase.database().ref("Time");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

      snapshot.forEach(function(data) {

        var id = data.key;

        showPoint2(data.key);
         
      });
    });

  }
  function showPoint2(id){
    var ref = firebase.database().ref("Time");
    ref.once("value")
    .then(function(snapshot){
      var time_in = snapshot.child(id).child("time_in").val();
      document.getElementById("user_time_in").innerHTML = "Time In : " + time_in;
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

function useTicket(){
  var d = new Date();
  var key = d.getTime();


}


function showTicket(){

  $('#loading').show();
  var Table1 = document.getElementById("myTable");
  Table1.innerHTML = "";
  var table3 = document.getElementById("myTable3");
  table3.innerHTML = "";

  var y = document.getElementById("ticket");
  y.style.display = "block";
  var x = document.getElementById("information");
  x.style.display = "none";
  var z = document.getElementById("history");
  z.style.display = "none";




  firebase.auth().onAuthStateChanged(function(user) {
    showId(user.email);
  });
  function showId(email){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var id = data.key;
        showPoint(data.key,email);
      });
    });
  }

  function showPoint(id,email){
    var ref = firebase.database().ref("User");
    var userDataRef = firebase.database().ref("Ticket");

    ref.once("value")
    .then(function(snapshot){
      var ticket = snapshot.child(id).child("ticket").val();
      if (ticket > 0) {
        $('#useticket_btn').show();
      }

      $('#loading').hide();
    });


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd = '0'+dd
    } 

    if(mm<10) {
      mm = '0'+mm
    } 

    today = dd + '/' + mm + '/' + yyyy;

    var countTicket = 1;
    var countTable1 = 0;
    var countTable2 = 0;

    userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        var date = childSnapshot.val().date;
        var email = childSnapshot.val().email;
        var status = childSnapshot.val().status;

        var time_in = childSnapshot.val().time_in;
        var time_out = childSnapshot.val().time_out;
        var date_in = childSnapshot.val().date_in;
        var date_out = childSnapshot.val().date_out;



        






        if (date_in == today || status == "stanby") {



          if (status == "stanby") {

            countTable1 += 1;

            document.getElementById("p_youTicket").innerHTML = "Your Ticket : ";

            var table = document.getElementById("myTable");
            var row = table.insertRow(0);
            var cell_key = row.insertCell(0);
            console.log("CHECK");
            cell_key.innerHTML = "Ticket : "+countTicket;
            countTicket += 1;

            var cell_status = row.insertCell(1);
            cell_status.innerHTML = '<center><a href="activate_ticket.html?ticket='+key+'" ><button class="btn btn-primary">Activate</button></a><center>';

            var cell_time_in = row.insertCell(2);
            cell_time_in.innerHTML = '<center><a href="transfer_ticket.html?ticket='+key+'" ><button class="btn btn-danger">Transfer</button></a><center>';






          }else if (status == "activated") {

            countTable2 += 1;

            document.getElementById("p_TicketActivated").innerHTML = "Ticket Activated : ";
            var table3 = document.getElementById("myTable3");
            var row3 = table3.insertRow(0);
            var cell_status = row3.insertCell(0);
            cell_status.innerHTML = "Activated";

            var cell_time_in = row3.insertCell(1);
            cell_time_in.innerHTML = time_in;

            var cell_date_in = row3.insertCell(2);
            cell_date_in.innerHTML = date_in;

            var cell_barcode = row3.insertCell(3);

            cell_barcode.innerHTML = '<center><a href="show_barcode_ticket.html?ticket='+key+'" ><button class="btn btn-info">Barcode</button></a><center>';


          }

        }

      });

      if (countTable1 >0) {
        lastShowTicket();
      }

      if (countTable2 >0) {
        lastShowTicket2();
      }
      
      
    });

  }

  
  

}




function lastShowTicket(){
  var table = document.getElementById("myTable");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>Ticket</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>Activate</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>Transfer</b></center>";
}


function lastShowTicket2(){
  var table = document.getElementById("myTable3");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>Status</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>Time In</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>Date In</b></center>";
  var cell = row.insertCell(3);
  cell.innerHTML = "<center><b>Barcode</b></center>";
}






function showHistory(){
  $('#loading').show();
  var Table2 = document.getElementById("myTable2");
  Table2.innerHTML = "";



  var z = document.getElementById("history");
  z.style.display = "block";
  // y.style.display = "none";
  var x = document.getElementById("information");
  x.style.display = "none";
  var y = document.getElementById("ticket");
  y.style.display = "none";

  firebase.auth().onAuthStateChanged(function(user) {
    showTable(user.email);
  });



  function showTable(email){


    var userDataRef = firebase.database().ref("Ticket");

    userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        var date = childSnapshot.val().date;
        var email = childSnapshot.val().email;
        var status = childSnapshot.val().status;

        var time_in = childSnapshot.val().time_in;
        var time_out = childSnapshot.val().time_out;


        var dateFrom = childSnapshot.val().date_in;
        var date_in = childSnapshot.val().date_in;


        var d1 = dateFrom.split("/");


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

        var dateCheck = dd_out + '/' + mm_out + '/' + yyyy_out;
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

        console.log(from);
        console.log(check);
        if (check > from) {
          var table = document.getElementById("myTable2");
          var row = table.insertRow(0);
          var cell_key = row.insertCell(0);
          cell_key.innerHTML = key;
          var cell_time_in = row.insertCell(1);
          cell_time_in.innerHTML = time_in;



          var cell_date_in = row.insertCell(2);
          cell_date_in.innerHTML = date_in;

          var cell_status = row.insertCell(3);
          cell_status.innerHTML = "Activated";
        }

      });
      $('#loading').hide();

    });

  }
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

    insertEmail(user.email);

  });





  function insertEmail(email){

    var ref = firebase.database().ref("Time");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

      snapshot.forEach(function(data) {

        edit(data.key);
      });
    });
  }

  function edit(id){
    var today_in = new Date();
    var dd_in = today_in.getDate();
    var mm_in = today_in.getMonth()+1;
    var yyyy_in = today_in.getFullYear();

    if(dd_in<10) {
      dd_in = '0'+dd_in;
    } 

    if(mm_in<10) {
      mm_in = '0'+mm_in;
    } 

    date_in = dd_in + '/' + mm_in + '/' + yyyy_in;

    var d_in = new Date(); 
    var hour_in = d_in.getHours();
    var minute_in = d_in.getMinutes(); 

    if (minute_in < 10) {
      minute_in = '0' + minute_in;
    }

    var time_in = hour_in + ":" + minute_in;

    var ref = firebase.database().ref("Time");
    ref.child(id)
    .update({ date: date_in,
     time_in: time_in,
     time_out: '-'
   });


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

    var d_out = new Date();
    var hour_out = d_out.getHours(); 
    var minute_out = d_out.getMinutes(); 

    if (minute_out < 10) {
      minute_out = '0' + minute_out;
    }

    var time_out = hour_out + ":" + minute_out;

    var ref = firebase.database().ref("Time");
    ref.child(id)
    .update({ 
     time_out: time_out
   });


  }
  alert("Time out Complete!");


}








