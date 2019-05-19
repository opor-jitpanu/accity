window.onload = function(){
	
	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}
}



function showData(){

	var userDataRef = firebase.database().ref("Place");
	var ref = firebase.database().ref("Place");

	


	var ref = firebase.database().ref('Place');
	ref
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();


		reCount(place.place_id, place.name, place.point);
		

		
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}



function reCount(place_id, name, point){

	var t = $('#datatablePlace').DataTable();


	var ref = firebase.database().ref('Checkin');
	



	var ref = firebase.database().ref("Checkin");
	ref
	.orderByChild('location')
	.equalTo(place_id)
	.on("value", function(snapshot) {


		t.row.add( [
			place_id,
			name,
			point,
			snapshot.numChildren(),
			
			'<a href="place_edit.html?place='+place_id+'" ><button class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> Edit</button></a>'+
			'<a href="place_delete.html?place='+place_id+'" ><button class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> Delete</button></a>'+
			'<a href="place_image.html?place='+place_id+'" ><button class="btn btn-info btn-xs"><i class="fa fa-file-image-o"></i> Image</button></a>'
			] ).draw( false );



	})



}