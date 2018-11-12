window.onload = function(){
	
}

function BackHome(){
	window.location.href = "index_staff.html";
}


function CheckTimeInOnClick(){
	var ticket_id = document.getElementById('ticket_id').value;


	var ref = firebase.database().ref("Ticket");
	ref.once("value")
	.then(function(snapshot){
		var time_in = snapshot.child(ticket_id).child("time_in").val();

		var type = snapshot.child(ticket_id).child("type").val();


		console.log(time_in);
		if (time_in == "-") {
			var d = new Date(); 
			var hour = d.getHours(); 
			var minute = d.getMinutes();

			if (minute < 10) {
				minute = '0' + minute;
			}

			var time = hour + ":" + minute;

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();


			var nextDay = new Date(today);
			nextDay.setDate(today.getDate()+1);
			var ndd = nextDay.getDate();
			var nmm = nextDay.getMonth()+1;
			var nyyyy = nextDay.getFullYear();


			if(ndd<10) {
				ndd = '0'+ndd
			} 

			if(nmm<10) {
				nmm = '0'+nmm
			} 


			if(dd<10) {
				dd = '0'+dd
			} 

			if(mm<10) {
				mm = '0'+mm
			} 

			today = dd + '/' + mm + '/' + yyyy;
			var valid = ndd + '/' + nmm + '/' + nyyyy;


			if (type == "normal") {
				var ref = firebase.database().ref("Ticket");
				ref.child(ticket_id)
				.update({ 
					time_in: time,
					issue:today,
					valid:valid
				});
			}else if (type == "year") {

				console.log('yeaar');
				var today = new Date();

				var yyyy = today.getFullYear();
				var issue = "01/01/"+yyyy;
				var valid = "31/12/"+yyyy;


				var ref = firebase.database().ref("Ticket");
				ref.child(ticket_id)
				.update({ 
					time_in: time,
					issue:issue,
					valid:valid
				});
			}


			

			





			var ref = firebase.database().ref("Ticket");
			ref.once("value")
			.then(function(snapshot){
				var email = snapshot.child(ticket_id).child("email").val();
				insertEmail(email);
			});


			function insertEmail(email){

				var ref = firebase.database().ref("Time");
				ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

					snapshot.forEach(function(data) {

						edit(data.key);
					});
				});
			}

			function edit(id){
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

				var d_in = new Date(); 
				var hour_in = d_in.getHours();
				var minute_in = d_in.getMinutes(); 

				if (minute_in < 10) {
					minute_in = '0' + minute_in;
				}

				var time_in = hour_in + ":" + minute_in;

				var ref = firebase.database().ref("Time");
				ref.child(id)
				.update({ date: date_in,
					time_in: time_in,
					time_out: '-'
				});


			}
			alert("Time in Complete!");
		}else{
			alert("Sorry, Ticket is Activated");
		}
	});

	
	

	




}