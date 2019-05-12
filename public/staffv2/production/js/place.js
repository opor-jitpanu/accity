window.onload = function(){
	showData();
}



function showData(){

	var userDataRef = firebase.database().ref("Place");
	var ref = firebase.database().ref("Place");

	var t = $('#datatablePlace').DataTable();


	var ref = firebase.database().ref('Place');
	ref
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();
		

		t.row.add( [
			place.place_id,
			place.name,
			place.point,
			
			'<center><a href="place_edit.html?place='+place.place_id+'" ><button class="btn btn-primary">Edit</button></a><center>',
			'<center><a href="place_delete.html?place='+place.place_id+'" ><button class="btn btn-danger">Delete</button></a><center>',
			'<center><a href="place_image.html?place='+place.place_id+'" ><button class="btn btn-info">Image</button></a><center>'
			] ).draw( false );
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


