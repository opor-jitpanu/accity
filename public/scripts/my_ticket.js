var countNormal = 0; 


window.onload = function(){

	firebase.auth().onAuthStateChanged(function(user) {
		var email = user.email;


		var userDataRef = firebase.database().ref("Ticket");
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
		userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {
			
			var countAcNormal = 0; 
			var barcode = '';
			snapshot.forEach(function(childSnapshot) {



				var key = childSnapshot.key;
				var childData = childSnapshot.val();

				var date = childSnapshot.val().date;
				var email = childSnapshot.val().email;
				var status = childSnapshot.val().status;

				var time_in = childSnapshot.val().time_in;
				var time_out = childSnapshot.val().time_out;
				var date_in = childSnapshot.val().date_in;
				var date_out = childSnapshot.val().date_out;

				var type = childSnapshot.val().type;

				var issue = childSnapshot.val().issue;
				var valid = childSnapshot.val().valid;

				

				if (date_in == today || status == "stanby") {

					if (status == "stanby" && type == "normal") {

						countNormal += 1;

					}else if (status == "stanby" && type == "year") {
						


					}
					else if (status == "activated" && type == "normal" && issue == '-') {

						countAcNormal += 1;
						barcode += key+"**"; 
						
					}else if (status == "activated" && type == "normal") {



					}

				}

			});


			document.getElementById("ticket_normal_count").innerHTML = '#Tickets : ' + countNormal;
			document.getElementById("ticket_normal_activate").innerHTML = '#Tickets Activated : ' + countAcNormal;
			console.log(barcode);
			if (countAcNormal > 0) {
				var url = 'https://barcode.tec-it.com/barcode.ashx?data=' + barcode + '&code=Code128&dpi=96&dataseparator=';
				$('#barcode2').attr('src', url);
			}else{
				$('#barcode2').hide();
			}



			if (countNormal == 0) {
				$('#btn_modal').hide();
			}

		});
	});



}










function ticketactivateminusOnClick(){
	var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket > 0) {
      	ticket = parseInt(ticket);
      	ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
    }

}


function ticketactivateplusOnClick(){

	var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket >= 0 && ticket < countNormal) {
      	ticket = parseInt(ticket);
      	ticket += 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
    }

}



function SubmitCheckOnClick(){
	var ticket = document.getElementById('ticket1').value;
	var userDataRef = firebase.database().ref("Ticket");
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

	var check = 0;
	firebase.auth().onAuthStateChanged(function(user) {
		var email = user.email;
		userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {



				var key = childSnapshot.key;
				var childData = childSnapshot.val();

				var date = childSnapshot.val().date;
				var email = childSnapshot.val().email;
				var status = childSnapshot.val().status;

				var time_in = childSnapshot.val().time_in;
				var time_out = childSnapshot.val().time_out;
				var date_in = childSnapshot.val().date_in;
				var date_out = childSnapshot.val().date_out;

				var type = childSnapshot.val().type;

				var issue = childSnapshot.val().issue;
				var valid = childSnapshot.val().valid;

				

				if (date_in == today || status == "stanby") {

					if (status == "stanby" && type == "normal") {


						if (check < ticket) {
							console.log(key);
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
							ref.child(key)
							.update({ 
								status : 'activated',
								date_in : today

							});
							check += 1;
						}else if (check == ticket) {
							window.location.href = "my_ticket.html";
						}else{
							window.location.href = "my_ticket.html";
						}

					}

				}

			});
			if (check == ticket) {
				window.location.href = "my_ticket.html";
			}
		});


		
		
	});

	
	





}









