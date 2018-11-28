var countNormal = 0; 
var countYear = 0;
var countAcYear = 0;


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
						
						countYear += 1;

					}
					else if (status == "activated" && type == "normal" && issue == '-') {

						countAcNormal += 1;
						barcode += key+"**"; 
						
					}else if (status == "activated" && type == "normal" && issue == '-') {

						countAcYear += 1;

					}

				}

			});


			document.getElementById("ticket_normal_count").innerHTML = '#Tickets : ' + countNormal;
			document.getElementById("ticket_normal_activate").innerHTML = '#Tickets Activated : ' + countAcNormal;


			document.getElementById("ticket_year_count").innerHTML = '#Tickets : ' + countYear;
			// document.getElementById("ticket_year_activate").innerHTML = '#Tickets Activated : ' + countAcYear;

			console.log(barcode);
			if (countAcNormal > 0) {
				// var url = 'https://barcode.tec-it.com/barcode.ashx?data=' + barcode + '&code=Code128&dpi=96&dataseparator=';
				// $('#barcode2').attr('src', url);
				var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + barcode + '&amp;size=50x50';
				$('#barcode').attr('src', url);
			}else{
				// $('#barcode2').hide();
				$('#barcode').hide();
			}



			if (countNormal == 0) {
				$('#btn_modal').hide();
				$('#btn_modal2').hide();
				
			}


			document.getElementById("loading").style.display = "none";




		});

		

	});











	// var table = document.getElementById("myTable");
	// var row = table.insertRow(0);

	// var cell_place_id = row.insertCell(0);
	// cell_place_id.innerHTML = place_id;

	// var cell_place_name = row.insertCell(1);
	// cell_place_name.innerHTML = place_name;
	var userDataRef = firebase.database().ref("Ticket");
	var today = new Date();
	var yyyy = today.getFullYear();

	
	
	firebase.auth().onAuthStateChanged(function(user) {
		var email = user.email;
		userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {


				var table = document.getElementById("myTable");
				var row = table.insertRow(0);

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




				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yyyy = today.getFullYear();

				today = dd + '/' + mm + '/' + yyyy;

				var dateFrom = issue;
				var dateTo = valid;
				var dateCheck = today;

				var d1 = dateFrom.split("/");
				var d2 = dateTo.split("/");
				var c = dateCheck.split("/");

				var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
				var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
				var check = new Date(c[2], parseInt(c[1])-1, c[0]);

				// console.log(check > from && check < to)



				if (type == "year") {
					if (valid == "-" || check > from && check < to) {
						
						var cell_id = row.insertCell(0);
						cell_id.innerHTML = '<img id="barcode2" src="https://barcode.tec-it.com/barcode.ashx?data=' + key + '**&code=Code128&dpi=96&dataseparator=+"" width="100%" alt="Barcode Generator TEC-IT"/><br>Issue : '+issue+'<br>Valid : '+ valid;
						console.log(key+'**');
						

					}
				}



			// if (date_in == today || status == "stanby") {

			// 	if (status == "stanby" && type == "normal") {


			// 		if (check < ticket) {
			// 			console.log(key);
			// 			var today = new Date();
			// 			var dd = today.getDate();
			// 			var mm = today.getMonth()+1;
			// 			var yyyy = today.getFullYear();

			// 			if(dd<10) {
			// 				dd = '0'+dd
			// 			} 

			// 			if(mm<10) {
			// 				mm = '0'+mm
			// 			} 

			// 			today = dd + '/' + mm + '/' + yyyy;

			// 			console.log(today);

			// 			var ref = firebase.database().ref("Ticket");
			// 			ref.child(key)
			// 			.update({ 
			// 				status : 'activated',
			// 				date_in : today

			// 			});
			// 			check += 1;
			// 		}else if (check == ticket) {
			// 			window.location.href = "my_ticket.html";
			// 		}else{
			// 			window.location.href = "my_ticket.html";
			// 		}

			// 	}

			// }

		});
			// if (check == ticket) {
			// 	window.location.href = "my_ticket.html";
			// }
		});



		
	});






}




function ticketactivateminus3OnClick(){
	var ticket = document.getElementById('ticket3').value;
      // console.log(ticket);
      if (ticket > 0) {
      	ticket = parseInt(ticket);
      	ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket3").value = ticket;
    }

}


function ticketactivateplus3OnClick(){

	var ticket = document.getElementById('ticket3').value;
      // console.log(ticket);
      if (ticket >= 0 && ticket < countNormal) {
      	ticket = parseInt(ticket);
      	ticket += 1;
        // console.log("tet");

        document.getElementById("ticket3").value = ticket;
    }

}





function ticketactivateminus2OnClick(){
	var ticket = document.getElementById('ticket2').value;
      // console.log(ticket);
      if (ticket > 0) {
      	ticket = parseInt(ticket);
      	ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket2").value = ticket;
    }

}


function ticketactivateplus2OnClick(){

	var ticket = document.getElementById('ticket2').value;
      // console.log(ticket);
      if (ticket >= 0 && ticket < countNormal) {
      	ticket = parseInt(ticket);
      	ticket += 1;
        // console.log("tet");

        document.getElementById("ticket2").value = ticket;
    }

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





function SubmitCheck2OnClick(){



	
}












function transferOnClick(){
	var ticket = document.getElementById('ticket3').value;
	var email_transfer = document.getElementById('InputEmail').value;
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



							var ref = firebase.database().ref("Ticket");
							ref.child(key)
							.update({ 
								email : email_transfer

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


