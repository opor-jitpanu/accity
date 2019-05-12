window.onload = function(){
	showData();
}



function showData(){

	var ref = firebase.database().ref("Reward");

	var t = $('#datatableReward').DataTable();


	ref
	.on('child_added', function(snapshot) { 
		var reward = snapshot.val();
		

		t.row.add( [
			reward.name,
			 
			reward.point,
			'<a href="reward_edit.html?place='+reward.id+'" ><button class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> Edit</button></a>'+
			'<a href="reward_delete.html?place='+reward.id+'" ><button class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> Delete</button></a>'+
			'<a href="reward_image.html?place='+reward.id+'" ><button class="btn btn-info btn-xs"><i class="fa fa-file-image-o"></i> Image</button></a>'
			] ).draw( false );
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


