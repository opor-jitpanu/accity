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



						var table = document.getElementById("myTable");
						var row = table.insertRow(0);

						console.log("CHECK");
						

						var cell_status = row.insertCell(0);
						cell_status.innerHTML = '<center><a href="activate_ticket.html?ticket='+key+'" ><button class="btn btn-primary">Activate</button></a><center>';

						var cell_time_in = row.insertCell(1);
						cell_time_in.innerHTML = '<center><a href="transfer_ticket.html?ticket='+key+'" ><button class="btn btn-danger">Transfer</button></a><center>';






					}else if (status == "stanby" && type == "year") {
						var table = document.getElementById("myTable2");
						var row = table.insertRow(0);

						console.log("CHECK");
						

						var cell_status = row.insertCell(0);
						cell_status.innerHTML = '<center><a href="activate_ticket.html?ticket='+key+'" ><button class="btn btn-primary">Activate</button></a><center>';

						var cell_time_in = row.insertCell(1);
						cell_time_in.innerHTML = '<center><a href="transfer_ticket.html?ticket='+key+'" ><button class="btn btn-danger">Transfer</button></a><center>';


					}
					else if (status == "activated") {

						


						var table3 = document.getElementById("myTable3");
						var row3 = table3.insertRow(0);
						var cell_status = row3.insertCell(0);
						cell_status.innerHTML = "Activated";

						var cell_time_in = row3.insertCell(1);
						cell_time_in.innerHTML = issue;

						var cell_date_in = row3.insertCell(2);
						cell_date_in.innerHTML = valid;

						var cell_date_in = row3.insertCell(3);
						cell_date_in.innerHTML = type;

						var cell_barcode = row3.insertCell(4);

						cell_barcode.innerHTML = '<center><a href="show_barcode_ticket.html?ticket='+key+'" ><button class="btn btn-info">Barcode</button></a><center>';


					}

				}

			});


			lastShowTicket();

			


		});
	});




}



function lastShowTicket(){
  var table = document.getElementById("myTable3");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<center><b>Status</b></center>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<center><b>issue</b></center>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<center><b>valid</b></center>";
  var cell = row.insertCell(3);
  cell.innerHTML = "<center><b>type</b></center>";
}
