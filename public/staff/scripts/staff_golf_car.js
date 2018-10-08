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
	showGolf(today);



}




function showGolf(day){
	var userDataRef = firebase.database().ref("Golfcar").orderByChild("date").equalTo(day);
	// var userDataRef = firebase.database().ref("Time").orderByKey();
	// var ref = firebase.database().ref("User");


	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var childData = childSnapshot.val();              

			var email_val = childSnapshot.val().email;
			var check_in = childSnapshot.val().check_in;
			var check_out = childSnapshot.val().check_out;
			var date = childSnapshot.val().date;
			var golf_id = childSnapshot.val().golf_id;

			var table = document.getElementById("myTable");
			var row = table.insertRow(0);



			var cell_golf_id = row.insertCell(0);
			cell_golf_id.innerHTML = golf_id;

			var cell_date = row.insertCell(1);
			cell_date.innerHTML = date;

			var cell_check_in = row.insertCell(2);
			cell_check_in.innerHTML = check_in;

			var cell_check_out = row.insertCell(3);
			cell_check_out.innerHTML = check_out;

			var cell_email = row.insertCell(4);
			cell_email.innerHTML = email_val;



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
	cell.innerHTML = "<center><b>Golf Car ID</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Date</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Check in</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Check out</b></center>";
	var cell = row.insertCell(4);
	cell.innerHTML = "<center><b>Email</b></center>";

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
	showGolf(date2);
}

