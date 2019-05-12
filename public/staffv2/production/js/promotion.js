window.onload = function(){
	showData();
}



function showData(){

	
	var ref = firebase.database().ref("Promotion");

	var t = $('#datatablePromotion').DataTable();


	var ref = firebase.database().ref('Promotion');
	ref
	.on('child_added', function(snapshot) { 
		var promotion = snapshot.val();
		

		t.row.add( [
			promotion.title,
			promotion.description1,
			
			promotion.date_in +" - "+ promotion.date_out,
			'<center><a href="promotion_edit.html?place='+promotion.id+'" ><button class="btn btn-primary">Edit</button></a><center>',
			'<center><a href="promotion_delete.html?key='+promotion.id+'" ><button class="btn btn-danger">Delete</button></a><center>',
			'<center><a href="promotion_image.html?key='+promotion.id+'" ><button class="btn btn-info">Image</button></a><center>'
			] ).draw( false );
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


