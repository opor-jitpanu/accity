var countNormal = 0; 
var countYear = 0;
var countAcYear = 0;






function ticketactivateMinusOnClick(){
	var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket > 0) {
      	ticket = parseInt(ticket);
      	ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
    }

}




function ticketactivatePlusOnClick(){

	var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket >= 0 && ticket < countNormal) {
      	ticket = parseInt(ticket);
      	ticket += 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
    }

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

						

					}

				}




				if (type == "year" && status == "activated") {
					countAcYear += 1;
				}




			});


			document.getElementById("ticket_normal_count").innerHTML = '#Tickets : ' + countNormal;
			document.getElementById("ticket_normal_activate").innerHTML = '#Tickets Activated : ' + countAcNormal;


			document.getElementById("ticket_year_count").innerHTML = '#Tickets : ' + countYear;
			// document.getElementById("ticket_year_activated").innerHTML = '#Tickets Activated : ' + countAcYear;
			

			console.log(barcode);
			console.log(countAcYear);
			if (countAcNormal > 0) {

				var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + barcode + '&amp;size=50x50';
				$('#barcode').attr('src', url);
			}else{

				$('#barcode').hide();
			}

			

			if (countAcYear > 0 ) {

				console.log('countAcYear : ' + countAcYear);

				

			}




			if (countNormal == 0) {
				$('#btn_modal').hide();
				$('#btn_modal2').hide();
				
			}


			document.getElementById("loading").style.display = 'none';



		});

		

	});



	




	var userDataRef = firebase.database().ref("Ticket");
	var today = new Date();
	var yyyy = today.getFullYear();

	var check1 = 0;
	var check2 = 0;

	
	
	firebase.auth().onAuthStateChanged(function(user) {
		var email = user.email;
		userDataRef.orderByChild("email").equalTo(email).once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {


				var table = document.getElementById("myTable");
				var row = table.insertRow(0);

				var table2 = document.getElementById("myTable2");
				var row2 = table2.insertRow(0);

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


				var name = childSnapshot.val().name;

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

				



				if (type == "year") {
					if (valid == "-" || check > from && check < to) {



						if (name !== '-') {
							check1 += 1;
							var cell_id = row.insertCell(0);


							cell_id.innerHTML = '<center><img id="barcode" src="https://api.qrserver.com/v1/create-qr-code/?data=' + key + '**&amp;size=150x150" alt="" title="HELLO" width="170"  height="170" /></center><br>Name : '+name+'<br>Issue : '+issue+'<br>Valid : '+ valid;
							
							// cell_id.innerHTML = '<img id="barcode2" src="https://barcode.tec-it.com/barcode.ashx?data=' + key + '**&code=Code128&dpi=96&dataseparator=+"" width="100%" alt="Barcode Generator TEC-IT"/><br>Name : '+name+'<br>Issue : '+issue+'<br>Valid : '+ valid;
							console.log(key+'**');
						}
						
						if (name == '-') {
							check2 += 1;
							var cell_id2 = row2.insertCell(0);
							cell_id2.innerHTML = '<center><img id="barcode" src="https://api.qrserver.com/v1/create-qr-code/?data=' + key + '**&amp;size=150x150" alt="" title="HELLO" width="170"  height="170" /><br><a href="activate_ticket_year.html?ticket='+key+'" class="btn btn-primary">Activate</a></center><br><br>';
							console.log(key+'**');
						}

					}
				}





			});

			// if (check1 == 0) {
			// 	var c = document.getElementById("txt_ticket_activated");
			// 	c.style.display = "none";
			// }

			// if (check2 == 0) {
			// 	var a = document.getElementById("txt_ticket_no_activated");
			// 	a.style.display = "none";
			// }
			// if (check1 > 0) {
			// 	var c = document.getElementById("txt_ticket_activated");
			// 	c.style.display = "block";
			// }
			// if (check2 > 0) {
			// 	console.log('check2');
			// 	var a = document.getElementById("txt_ticket_no_activated");
			// 	a.style.display = "block";
			// }
			
		});

		
		
	});














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



