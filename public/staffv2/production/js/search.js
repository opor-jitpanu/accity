window.onload = function(){

	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}

	
}

function showData(){

	$.fn.dataTable.ext.errMode = 'none';

	var t = $('#datatable').DataTable();


	var ref = firebase.database().ref('User');
	ref
	.on('child_added', function(snapshot) { 
		var user = snapshot.val();
		


		if (user.sex == 'male') {
			t.row.add( [
				'<center><a href="showdata_profile.html?email='+user.email+'" >' + user.firstname + " " + user.lastname + '</a><center>',
				user.email,
				'ชาย',
				user.birth
				] ).draw( false );
		}else {
			t.row.add( [
			'<center><a href="showdata_profile.html?email='+user.email+'" >' + user.firstname + " " + user.lastname + '</a><center>',
			user.email,
			'หญิง',
			user.birth
			] ).draw( false );
		}

		
	});
}



