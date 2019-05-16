window.onload = function(){
	



	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}



}

function showData(){




	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;






	$.fn.dataTable.ext.errMode = 'none';

	var t = $('#datatable').DataTable();


	var ref1 = firebase.database().ref('User');
	var ref2 = firebase.database().ref('TimeIn');

	ref2
	.on('child_added', function(snapshot) { 
		var user2 = snapshot.val();








		ref1
		.orderByChild('email')
		.equalTo(user2.email)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();



			if (user2.date == today) {
				t.row.add( [
					'<a href="showdata_profile.html?email='+user2.email+'" >' + user.firstname + " " + user.lastname + '</a>',
					user2.email,
					user2.time
					] ).draw( false );
			}

			






		});









	});


}



// '<center><a href="showdata_profile.html?email='+user2.email+'" >' + user2.firstname + " " + user2.lastname + '</a><center>'