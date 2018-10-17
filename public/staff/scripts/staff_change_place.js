window.onload = function(){
	showData();
}



function showData(){

	var userDataRef = firebase.database().ref("Place");
	var ref = firebase.database().ref("Place");


	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var place_id = childSnapshot.val().place_id;
			var place_name = childSnapshot.val().name;
			var point = childSnapshot.val().point;
			var description = childSnapshot.val().description;

			

			var table = document.getElementById("myTable");
			var row = table.insertRow(0);

			var cell_place_id = row.insertCell(0);
			cell_place_id.innerHTML = place_id;

			var cell_place_name = row.insertCell(1);
			cell_place_name.innerHTML = place_name;

			var cell_point = row.insertCell(2);
			cell_point.innerHTML = point;

			var cell_description = row.insertCell(3);
			cell_description.innerHTML = description;

			var cell_btn = row.insertCell(4);
			cell_btn.innerHTML = '<center><a href="staff_edit_place.html?place='+place_id+'" ><button class="btn btn-primary">Edit</button></a><center>';

			
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
	cell.innerHTML = "<center><b>Place ID</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Name</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Point</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Description</b></center>";
	var cell = row.insertCell(4);
	cell.innerHTML = "<center><b>Edit</b></center>";
}








