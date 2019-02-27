window.onload = function(){


	

	


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
	showData(today);

}



function showData(day){

	var userDataRef = firebase.database().ref("Time").orderByChild("date").equalTo(day);
	var ref = firebase.database().ref("User");


	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var date = childSnapshot.val().date;
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
			        var cell_date = row.insertCell(0);
			        cell_date.innerHTML = date;
			        var cell_time_in = row.insertCell(1);
			        cell_time_in.innerHTML = time_in;
			        var cell_time_out = row.insertCell(2);
			        cell_time_out.innerHTML = time_out;
			        var cell_tel = row.insertCell(3);
			        cell_tel.innerHTML = firstname + " " + lastname;
			        
			        var cell_btn = row.insertCell(4);
			        cell_btn.innerHTML = '<center><a href="staff_showdata.html?email='+email+'" ><button class="btn btn-primary">More Information</button></a><center>';
			    });
        	});




    	});
		});
		document.getElementById("date_txt").innerHTML = "Date : " + day;
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
	cell.innerHTML = "<center><b>Date</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Time In</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Time out</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Name</b></center>";
	var cell = row.insertCell(4);
	cell.innerHTML = "<center><b>More</b></center>";
}


function infoClick(){
	window.location.href = "index_staff.html";
}




function dateOnClick(){
	var date = document.getElementById('inputDate').value;
	var year = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
	var month = date.charAt(5) + date.charAt(6);
	var day = date.charAt(8) + date.charAt(9); 
	var date2 = day + "/" + month + "/" + year;


	var Table = document.getElementById("myTable");
	Table.innerHTML = "";
	// alert(date2);
	showData(date2);
}
