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
        showInfo(data.key);
    });
  });
 }

  function showInfo(id){
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
    
    
    
 }