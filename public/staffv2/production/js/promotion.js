window.onload = function(){


	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}
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
			'<a href="promotion_edit.html?place='+promotion.id+'" ><button class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> Edit</button></a>'+
			'<a href="promotion_delete.html?key='+promotion.id+'" ><button class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> Delete</button></a>'+
			'<a href="promotion_image.html?key='+promotion.id+'" ><button class="btn btn-info btn-xs"><i class="fa fa-file-image-o"></i> Image</button></a>'
			] ).draw( false );
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


