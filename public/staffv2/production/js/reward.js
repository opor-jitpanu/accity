window.onload = function(){
	


	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}
}



function showData(){

	var ref = firebase.database().ref("Reward");

	var t = $('#datatableReward').DataTable();


	ref
	.on('child_added', function(snapshot) { 
		var reward = snapshot.val();



		var storageRef = firebase.storage().ref();
		var spaceRef = storageRef.child('rewards/'+reward.id+'.jpg');
		storageRef.child('rewards/'+reward.id+'.jpg').getDownloadURL().then(function(url) {
			var test = url;
			

			t.row.add( [
				'<a href="reward_image.html?place='+reward.id+'" ><img id="image1" src="'+url+'" width="100%"></a>',
				'<a href="reward_edit.html?place='+reward.id+'" >'+reward.name+'</a>',

				reward.point,
				
				'<a href="reward_delete.html?place='+reward.id+'" ><button class="btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></a>'
				
				] ).draw( false );


		}).catch(function(error) {

		});
		


	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


