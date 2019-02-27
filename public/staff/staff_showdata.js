window.onload = function(){


	
	
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var email = url.searchParams.get("email");
	// console.log(c);
	getId(email);

}

function getId(email){
  var ref = firebase.database().ref("User");
  ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        // document.getElementById("p2").innerHTML = data.key;
        showInfo(data.key,email);
      });
  });
}

function showInfo(id,email){
	var ref = firebase.database().ref("User");
 ref.once("value")
 .then(function(snapshot){
  var birth = snapshot.child(id).child("birth").val();
  document.getElementById("birth").innerHTML = "Birth day : " + birth;
});
 ref.once("value")
 .then(function(snapshot){
  var firstname = snapshot.child(id).child("firstname").val();
  document.getElementById("firstname").innerHTML = "First name : "+firstname;
});
 ref.once("value")
 .then(function(snapshot){
  var lastname = snapshot.child(id).child("lastname").val();
  document.getElementById("lastname").innerHTML = "Last name : " + lastname;
});
 ref.once("value")
 .then(function(snapshot){
  var email = snapshot.child(id).child("email").val();
  document.getElementById("email").innerHTML = "Email : " + email;
});
 ref.once("value")
 .then(function(snapshot){
  var password = snapshot.child(id).child("password").val();
  document.getElementById("password").innerHTML = "Password : " + password;
});    
 ref.once("value")
 .then(function(snapshot){
  var sex = snapshot.child(id).child("sex").val();
  document.getElementById("sex").innerHTML = "Gender : " + sex;
});
 ref.once("value")
 .then(function(snapshot){
  var tel = snapshot.child(id).child("tel").val();
  document.getElementById("tel").innerHTML ="Telephone : " +  tel;
});
 ref.once("value")
 .then(function(snapshot){
  var country = snapshot.child(id).child("country").val();
  document.getElementById("country").innerHTML = "Country : " + country;
});
 ref.once("value")
 .then(function(snapshot){
  var point = snapshot.child(id).child("point").val();
  document.getElementById("point").innerHTML = "Point : " + point;
});

 showCheckin(email);
 showTicket(email);
 showReward(email);

}


function showCheckin(email){
  var userDataRef = firebase.database().ref("Checkin").orderByChild("email").equalTo(email);



  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              

      var location = childSnapshot.val().location;
      var check_in = childSnapshot.val().time_checkin;
      var date = childSnapshot.val().date;
      

      



      var table = document.getElementById("myTable");
      var row = table.insertRow(0);

      if (date != '-') {

        var cell_golf_id = row.insertCell(0);
        var ref = firebase.database().ref("Place").orderByChild("place_id").equalTo(location);
        ref.on('child_added', function(snapshot) { 
          var user = snapshot.val();

          cell_golf_id.innerHTML = user.name;
        });


        var cell_date = row.insertCell(1);
        cell_date.innerHTML = check_in;

        var cell_date2 = row.insertCell(2);
        cell_date2.innerHTML = date;
      }




    });

    last();
  });


  
}



function last(){
  var table = document.getElementById("myTable");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>Location ID</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>Time</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>Date</b></center>";


}


function lastTicket(){
  var table = document.getElementById("myTable2");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>ลำดับ</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>วันที่ซื้อ</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>วันที่เริ่มใช้งาน</b></center>";
  var cell = row.insertCell(3);
  cell.innerHTML = "<center><b>วันหมดอายุ</b></center>";
  var cell = row.insertCell(4);
  cell.innerHTML = "<center><b>ประเภท</b></center>";


}
function lastReward(){
  var table = document.getElementById("myTable3");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>วันที่</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>เวลา</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>Status</b></center>";
  var cell = row.insertCell(3);
  cell.innerHTML = "<center><b>ชื่อของรางวัล</b></center>";
}


function showTicket(email){

  var countTicket = 0;
  var userDataRef = firebase.database().ref("Ticket").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              
      
      var table = document.getElementById("myTable2");
      var row = table.insertRow(0);

      countTicket += 1;
      var cell_count = row.insertCell(0);
      cell_count.innerHTML = countTicket;

      var cell_golf_id = row.insertCell(1);
      cell_golf_id.innerHTML = childData.date_buy;


      var cell_date = row.insertCell(2);
      cell_date.innerHTML = childData.date_in;

      var cell_date2 = row.insertCell(3);
      cell_date2.innerHTML = childData.issue;

      var cell_type = row.insertCell(4);
      cell_type.innerHTML = childData.type;
      

    });

    lastTicket();
  });

}


function showReward(email){


  var userDataRef = firebase.database().ref("Code").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              
      
      var table = document.getElementById("myTable3");
      var row = table.insertRow(0);

      

      var cell_golf_id = row.insertCell(0);
      cell_golf_id.innerHTML = childData.date;


      var cell_date = row.insertCell(1);
      cell_date.innerHTML = childData.time;

      var cell_date2 = row.insertCell(2);
      cell_date2.innerHTML = childData.status;

      var cell_name = row.insertCell(3);
      
      var ref = firebase.database().ref("Reward").orderByKey().equalTo(childData.id);
      ref.on('child_added', function(snapshot) { 
        var user = snapshot.val();

        cell_name.innerHTML = user.name;
      });

    });

    lastReward();
  });

}