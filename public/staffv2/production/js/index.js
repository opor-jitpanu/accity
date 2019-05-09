window.onload = function(){


	var ref = firebase.database().ref("User");
	ref.on("value", function(snapshot) {
		document.getElementById("count_all_user").innerHTML = snapshot.numChildren();
	})



	var ref2 = firebase.database().ref("Checkin");
	ref2.on("value", function(snapshot) {
		document.getElementById("count_all_checkin").innerHTML = snapshot.numChildren();
	})


	var ref3 = firebase.database().ref("Place");
	ref3.on("value", function(snapshot) {
		document.getElementById("count_all_place").innerHTML = snapshot.numChildren();
	})


	var ref4 = firebase.database().ref("Ticket");
	ref4.on("value", function(snapshot) {
		document.getElementById("count_all_ticket").innerHTML = snapshot.numChildren();
	})



	var today_in = new Date();
	var dd_in = today_in.getDate();
	var mm_in = today_in.getMonth()+1;
	var yyyy_in = today_in.getFullYear();

	if(dd_in<10) {
		dd_in = '0'+dd_in;
	} 

	if(mm_in<10) {
		mm_in = '0'+mm_in;
	} 

	date_in = dd_in + '/' + mm_in + '/' + yyyy_in;


	var ref = firebase.database().ref('TimeIn');
	var count = 0;

	ref
	.orderByKey()
	.on('child_added', function(snapshot) { 
		var time = snapshot.val();
		
		if (date_in == time.date) {
			count += 1; 

		}
		document.getElementById("count_all_user_today").innerHTML = count;
		
		
	});




}