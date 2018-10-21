window.onload = function(){
	showData();
}



function showData(){

	var userDataRef = firebase.database().ref("Promotion");
	var ref = firebase.database().ref("Promotion");


	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			// var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var promotion_title = childSnapshot.val().title;
			var promotion_description1 = childSnapshot.val().description1;
			var promotion_description2 = childSnapshot.val().description2;
			var key = childSnapshot.val().id;

			

			var table = document.getElementById("myTable");
			var row = table.insertRow(0);

			var cell_title = row.insertCell(0);
			cell_title.innerHTML = promotion_title;

			var cell_des1 = row.insertCell(1);
			cell_des1.innerHTML = promotion_description1;

			var cell_des2 = row.insertCell(2);
			cell_des2.innerHTML = promotion_description2;

			var cell_key = row.insertCell(3);
			cell_key.innerHTML = key;


			var cell_btn = row.insertCell(4);
			cell_btn.innerHTML = '<center><a href="staff_edit_promotion.html?key='+key+'" ><button class="btn btn-primary">Edit</button></a><center>';

			var cell_btn2 = row.insertCell(5);
			cell_btn2.innerHTML = '<center><a href="staff_delete_promotion.html?key='+key+'" ><button class="btn btn-danger">Delete</button></a><center>';

			var cell_btn3 = row.insertCell(6);
			cell_btn3.innerHTML = '<center><a href="staff_edit_image_promotion.html?key='+key+'" ><button class="btn btn-info">Image</button></a><center>';
			
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
	cell.innerHTML = "<center><b>Title</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Description Promotion</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>More Description</b></center>";
	var cell = row.insertCell(3);
	cell.innerHTML = "<center><b>Key</b></center>";
	var cell = row.insertCell(4);
	cell.innerHTML = "<center><b>Edit</b></center>";
	var cell = row.insertCell(5);
	cell.innerHTML = "<center><b>Delete</b></center>";
	var cell = row.insertCell(6);
	cell.innerHTML = "<center><b>Image</b></center>";

}








