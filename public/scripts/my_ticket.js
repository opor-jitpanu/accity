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
			var countNormal = 0; 
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

		});
	});


















	document.getElementById("ticket_normal").style.display = "none";
	document.getElementById("ticket_year").style.display = "none";
	document.getElementById("ticket_activated").style.display = "none";

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


						document.getElementById("ticket_normal").style.display = "block";
						var table = document.getElementById("myTable");
						var row = table.insertRow(0);

						console.log("CHECK");
						

						var cell_status = row.insertCell(0);
						cell_status.innerHTML = '<center><a href="activate_ticket.html?ticket='+key+'" ><button class="btn btn-primary">Activate</button></a><center>';

						var cell_time_in = row.insertCell(1);
						cell_time_in.innerHTML = '<center><a href="transfer_ticket.html?ticket='+key+'" ><button class="btn btn-danger">Transfer</button></a><center>';






					}else if (status == "stanby" && type == "year") {
						document.getElementById("ticket_year").style.display = "block";
						var table = document.getElementById("myTable2");
						var row = table.insertRow(0);

						console.log("CHECK");
						

						var cell_status = row.insertCell(0);
						cell_status.innerHTML = '<center><a href="activate_ticket.html?ticket='+key+'" ><button class="btn btn-primary">Activate</button></a><center>';

						var cell_time_in = row.insertCell(1);
						cell_time_in.innerHTML = '<center><a href="transfer_ticket.html?ticket='+key+'" ><button class="btn btn-danger">Transfer</button></a><center>';


					}
					else if (status == "activated") {

						document.getElementById("ticket_activated").style.display = "block";

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

						cell_barcode.innerHTML = '<center><a href="show_barcode_ticket.html?ticket='+key+'" ><button class="btn btn-red">Barcode</button></a><center>';


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














function normalOnClick(){
	document.getElementById("normal_ticket").style.display = "block";
	document.getElementById("year_ticket").style.display = "none";
}


function yearOnClick(){
	document.getElementById("year_ticket").style.display = "block";
	document.getElementById("normal_ticket").style.display = "none";
	
}














(function() {
	$(document).ready(function() {
		var walkthrough;
		walkthrough = {
			index: 0,
			nextScreen: function() {
				if (this.index < this.indexMax()) {
					this.index++;
					return this.updateScreen();
				}
			},
			prevScreen: function() {
				if (this.index > 0) {
					this.index--;
					return this.updateScreen();
				}
			},
			updateScreen: function() {
				this.reset();
				this.goTo(this.index);
				return this.setBtns();
			},
			setBtns: function() {
				var $lastBtn, $nextBtn, $prevBtn;
				$nextBtn = $('.next-screen');
				$prevBtn = $('.prev-screen');
				$lastBtn = $('.finish');
				if (walkthrough.index === walkthrough.indexMax()) {
					$nextBtn.prop('disabled', true);
					$prevBtn.prop('disabled', false);
					return $lastBtn.addClass('active').prop('disabled', false);
				} else if (walkthrough.index === 0) {
					$nextBtn.prop('disabled', false);
					$prevBtn.prop('disabled', true);
					return $lastBtn.removeClass('active').prop('disabled', true);
				} else {
					$nextBtn.prop('disabled', false);
					$prevBtn.prop('disabled', false);
					return $lastBtn.removeClass('active').prop('disabled', true);
				}
			},
			goTo: function(index) {
				$('.screen').eq(index).addClass('active');
				return $('.dot').eq(index).addClass('active');
			},
			reset: function() {
				return $('.screen, .dot').removeClass('active');
			},
			indexMax: function() {
				return $('.screen').length - 1;
			},
			closeModal: function() {
				$('.walkthrough, .shade').removeClass('reveal');
				return setTimeout(((function(_this) {
					return function() {
						$('.walkthrough, .shade').removeClass('show');
						_this.index = 0;
						return _this.updateScreen();
					};
				})(this)), 200);
			},
			openModal: function() {
				$('.walkthrough, .shade').addClass('show');
				setTimeout(((function(_this) {
					return function() {
						return $('.walkthrough, .shade').addClass('reveal');
					};
				})(this)), 200);
				return this.updateScreen();
			}
		};
		$('.next-screen').click(function() {
			return walkthrough.nextScreen();
		});
		$('.prev-screen').click(function() {
			return walkthrough.prevScreen();
		});
		$('.close').click(function() {
			return walkthrough.closeModal();
		});
		$('.open-walkthrough').click(function() {
			return walkthrough.openModal();
		});
		walkthrough.openModal();
		return $(document).keydown(function(e) {
			switch (e.which) {
				case 37:
				walkthrough.prevScreen();
				break;
				case 38:
				walkthrough.openModal();
				break;
				case 39:
				walkthrough.nextScreen();
				break;
				case 40:
				walkthrough.closeModal();
				break;
				default:
				return;
			}
			e.preventDefault();
		});
	});

}).call(this);