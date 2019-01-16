window.onload = function(){
	showData();
}



function showData(){

	var userDataRef = firebase.database().ref("Reward");
	var ref = firebase.database().ref("Reward");


	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			// var reward_id = childSnapshot.key;
			var childData = childSnapshot.val();

			var reward_id = childSnapshot.val().id;
			var place_name = childSnapshot.val().name;
			var point = childSnapshot.val().point;
			var description = childSnapshot.val().description;

			

			var table = document.getElementById("myTable");
			var row = table.insertRow(0);



			var cell_id = row.insertCell(0);
			cell_id.innerHTML = reward_id;


			var cell_name = row.insertCell(1);
			cell_name.innerHTML = place_name;

			var cell_description = row.insertCell(2);
			cell_description.innerHTML = description;

			var cell_point = row.insertCell(3);
			cell_point.innerHTML = point;


			var cell_btn = row.insertCell(4);
			cell_btn.innerHTML = '<center><a href="staff_edit_reward.html?place='+reward_id+'" ><button class="btn btn-primary">Edit</button></a><center>';

			var cell_btn2 = row.insertCell(5);
			cell_btn2.innerHTML = '<center><a href="staff_delete_reward.html?place='+reward_id+'" ><button class="btn btn-danger">Delete</button></a><center>';

			var cell_btn3 = row.insertCell(6);
			cell_btn3.innerHTML = '<center><a href="staff_edit_image_reward.html?place='+reward_id+'" ><button class="btn btn-info">Image</button></a><center>';
			
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
	cell.innerHTML = "<center><b>Reward ID</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Description</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Point</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Description</b></center>";
	var cell = row.insertCell(4);
	cell.innerHTML = "<center><b>Edit</b></center>";
	var cell = row.insertCell(5);
	cell.innerHTML = "<center><b>Delete</b></center>";
	var cell = row.insertCell(6);
	cell.innerHTML = "<center><b>Image</b></center>";


}








