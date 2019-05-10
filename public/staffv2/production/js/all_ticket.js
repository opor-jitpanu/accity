window.onload = function(){
	showData();
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


	var ref1 = firebase.database().ref('Ticket');
	var ref2 = firebase.database().ref('User');

	ref1
	.on('child_added', function(snapshot) { 
		var ticket = snapshot.val();



		ref2
		.orderByChild('email')
		.equalTo(ticket.email)
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();


			t.row.add( [
				user.firstname + " " + user.lastname,
				ticket.status,
				ticket.type,
				ticket.valid,
				ticket.issue
				] ).draw( false );

	
		});

	});


}



// '<center><a href="showdata_profile.html?email='+user2.email+'" >' + user2.firstname + " " + user2.lastname + '</a><center>'