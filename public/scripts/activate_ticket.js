window.onload = function(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var ticket = url.searchParams.get("ticket");

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

	console.log(today);

	var ref = firebase.database().ref("Ticket");
	ref.child(ticket)
	.update({ 
		status : 'activated',
		date_in : today

	});
	
	

}