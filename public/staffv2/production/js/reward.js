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
			reward.description,
			reward.point,
			'<center><a href="reward_edit.html?place='+reward.id+'" ><button class="btn btn-primary">Edit</button></a><center>',
			'<center><a href="reward_delete.html?place='+reward.id+'" ><button class="btn btn-danger">Delete</button></a><center>',
			'<center><a href="reward_image.html?place='+reward.id+'" ><button class="btn btn-info">Image</button></a><center>'
			] ).draw( false );
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


