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

}


function showCheckin(email){
  var userDataRef = firebase.database().ref("Checkin").orderByChild("email").equalTo(email);
  // var userDataRef = firebase.database().ref("Time").orderByKey();
  // var ref = firebase.database().ref("User");


  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              

      var location = childSnapshot.val().location;
      var check_in = childSnapshot.val().time_checkin;
      var date = childSnapshot.val().date;
      

      var table = document.getElementById("myTable");
      var row = table.insertRow(0);



      var cell_golf_id = row.insertCell(0);
      cell_golf_id.innerHTML = location;

      var cell_date = row.insertCell(1);
      cell_date.innerHTML = check_in;

      var cell_date2 = row.insertCell(2);
      cell_date2.innerHTML = date;



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