window.onload = function(){



    


	var userDataRef = firebase.database().ref("Time").orderByKey();
	var ref = firebase.database().ref("User");


	userDataRef.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	 	var key = childSnapshot.key;
	  	var childData = childSnapshot.val();              

	  	var name_val = childSnapshot.val().email;
	  	var time_in = childSnapshot.val().time_in;
	  	var time_out = childSnapshot.val().time_out;

	  	var table = document.getElementById("myTable");
	    var row = table.insertRow(0);
	    


	  	ref.orderByChild('email').equalTo(name_val).on("value", function(snapshot) {
    		// console.log(snapshot.val());
    		snapshot.forEach(function(data) {
        	// console.log(data.key);
        		var id = data.key;
        		// document.getElementById("p2").innerHTML = data.key;
        		// showPoint(data.key);
        		// console.log(id);

        		ref.once("value")
			      .then(function(snapshot){
			        var firstname = capitalizeFirstLetter(snapshot.child(id).child("firstname").val());
			        var lastname = capitalizeFirstLetter(snapshot.child(id).child("lastname").val());
			        var tel = snapshot.child(id).child("tel").val();
			        var email = snapshot.child(id).child("email").val();

			        // document.getElementById("p_firstname").innerHTML = firstname;





			        var table = document.getElementById("myTable");
		    		var cell_firstname = row.insertCell(0);
					cell_firstname.innerHTML = firstname +"   "+ lastname;
					var cell_time_in = row.insertCell(1);
	  				cell_time_in.innerHTML = time_in;
	  				var cell_time_out = row.insertCell(2);
	  				cell_time_out.innerHTML = time_out;
	  				var cell_tel = row.insertCell(3);
	  				cell_tel.innerHTML = tel;
	  				var cell_email = row.insertCell(4);
	  				cell_email.innerHTML = email;
	  				var cell_btn = row.insertCell(5);
	  				cell_btn.innerHTML = '<center><a href="staff_showdata.html?email='+email+'" ><button class="btn btn-primary">More Information</button></a><center>';
			    });
    		});

		


  		});
	  });
	last();
	});
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}







function last(){
	var table = document.getElementById("myTable");
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "<center><b>Name</b></center>";
    var cell = row.insertCell(1);
    cell.innerHTML = "<center><b>Time In</b></center>";
    var cell = row.insertCell(2);
    cell.innerHTML = "<center><b>Time out</b></center>";
    var cell = row.insertCell(3);
    cell.innerHTML = "<center><b>Telephone</b></center>";
    var cell = row.insertCell(4);
    cell.innerHTML = "<center><b>Email</b></center>";
    var cell = row.insertCell(5);
    cell.innerHTML = "<center><b>More</b></center>";
}


function infoClick(){
        window.location.href = "index_staff.html";
    }


