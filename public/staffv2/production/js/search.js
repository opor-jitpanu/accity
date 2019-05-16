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
		

		t.row.add( [
			'<center><a href="showdata_profile.html?email='+user.email+'" >' + user.firstname + " " + user.lastname + '</a><center>',
			user.email,
			user.sex,
			user.birth
			] ).draw( false );
	});
}



