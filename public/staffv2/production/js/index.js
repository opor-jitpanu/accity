window.onload = function(){


	


	if (sessionStorage.getItem("login") == 'yes') {

		

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

		showGraphLine();
		showGengerGraph();
		showTicketGraph();
		showSaleGraph();
		
	}else{
		window.location.href = "login.html";
	}






}



function showGraphLine(){





	var ref2 = firebase.database().ref("Checkin");
	ref2.on("value", function(snapshot) {
		line(snapshot.numChildren());
	})





}


function line(line){

	var num1 = 0;
	var num2 = 0;
	var num3 = 0;
	var num4 = 0;
	var num5 = 0;
	var num6 = 0;
	var num7 = 0;
	var num8 = 0;
	var num9 = 0;
	var num10 = 0;
	var num11 = 0;
	var num12 = 0;
	var num13 = 0;
	var num14 = 0;





	var count = 0;




	// console.log(line);
	var ref1 = firebase.database().ref('Checkin');


	ref1
	.on('child_added', function(snapshot) { 
		var checkin = snapshot.val();


		var time = checkin.time_checkin;
		var time2 = time[0]+time[1];


		if (time2 == '08' ) {
			num1 += 1;
		}else if (time2 == '09' ) {
			num2 += 1;
		}else if (time2 == '10' ) {
			num3 += 1;
		}else if (time2 == '11' ) {
			num4 += 1;
		}else if (time2 == '12' ) {
			num5 += 1;
		}else if (time2 == '13' ) {
			num6 += 1;
		}else if (time2 == '14' ) {
			num7 += 1;
		}else if (time2 == '15' ) {
			num8 += 1;
		}else if (time2 == '16' ) {
			num9 += 1;
		}else if (time2 == '17' ) {
			num10 += 1;
		}else if (time2 == '18' ) {
			num11 += 1;
		}else if (time2 == '19' ) {
			num12 += 1;
		}else if (time2 == '20' ) {
			num13 += 1;
		}else if (time2 == '21' ) {
			num14 += 1;
		}

		count += 1;

		if (count == line) {


			new Morris.Line({

				element: 'myfirstchart',

				data: [
				{ time: '2019-05-29 08:00', value: num1 },
				{ time: '2019-05-29 09:00', value: num2 },
				{ time: '2019-05-29 10:00', value: num3 },
				{ time: '2019-05-29 11:00', value: num4 },
				{ time: '2019-05-29 12:00', value: num5 },
				{ time: '2019-05-29 13:00', value: num6 },
				{ time: '2019-05-29 14:00', value: num7 },
				{ time: '2019-05-29 15:00', value: num8 },
				{ time: '2019-05-29 16:00', value: num9 },
				{ time: '2019-05-29 17:00', value: num10 },
				{ time: '2019-05-29 18:00', value: num11 },
				{ time: '2019-05-29 19:00', value: num12 },
				{ time: '2019-05-29 20:00', value: num13 },
				{ time: '2019-05-29 21:00', value: num14 }
				],

				xkey: 'time',

				ykeys: ['value'],

				labels: ['Value']
			});

		}


	});


}


function showGengerGraph(){



	var ref1 = firebase.database().ref('User');
	var male = 0;
	var female = 0;
	var count2 = 0;


	var ref = firebase.database().ref("User");
	ref.on("value", function(snapshot2) {


		


		ref1
		.on('child_added', function(snapshot) { 
			var user = snapshot.val();
			if (user.sex == 'male') {

				male += 1;

			}else if(user.sex == 'female'){
				female += 1;
			}

			count2 += 1;


			if (count2 == snapshot2.numChildren()) {
				
				showGengerGraph2(male, female);
			}




		});


		
	})




}



function showGengerGraph2(male, female){


	document.getElementById("male_txt").innerHTML = "เพศชาย : " + ((male*100)/(male + female)).toFixed(2) +" % ";
	document.getElementById("female_txt").innerHTML = "เพศหญิง : " + ((female*100)/(male + female)).toFixed(2) +" % ";


	new Chart(document.getElementById("doughnut-chart"), {
		type: 'doughnut',
		data: {
			labels: ["ชาย", "หญิง"],
			datasets: [
			{
				label: "Population (millions)",
				backgroundColor: ["#5371a3", "#a35e84"],
				data: [((male*100)/(male + female)).toFixed(2),((female*100)/(male + female)).toFixed(2)]
			}
			]
		},
		options: {
			title: {
				display: true
			}
		}
	});


}


function showTicketGraph(){


	var ref1 = firebase.database().ref('Ticket');
	var day = 0;
	var year = 0;
	var count3 = 0;


	var ref = firebase.database().ref("Ticket");
	ref.on("value", function(snapshot2) {


		


		ref1
		.on('child_added', function(snapshot) { 
			var ticket = snapshot.val();
			if (ticket.type == 'year') {

				year += 1;

			}else if(ticket.type == 'normal'){
				day += 1;
			}

			count3 += 1;


			if (count3 == snapshot2.numChildren()) {
				
				showTicketGraph2(day,year);
				
			}




		});


		
	})

}


function showTicketGraph2(day,year){

	document.getElementById("day_txt").innerHTML = "ตั๋วรายวัน : " + ((day*100)/(day+year)).toFixed(2) + " % ";
	document.getElementById("year_txt").innerHTML = "ตั๋วรายปี : " + ((year*100)/(day+year)).toFixed(2) + " % ";


	new Chart(document.getElementById("ticket_chart"), {
		type: 'doughnut',
		data: {
			labels: ["ตั๋วรายวัน", "ตั๋วรายปี"],
			datasets: [
			{
				label: "Population (millions)",
				backgroundColor: ["#5371a3", "#a35e84"],
				data: [((day*100)/(day+year)).toFixed(2),((year*100)/(day+year)).toFixed(2)]
			}
			]
		},
		options: {
			title: {
				display: true
			}
		}
	});

}







function showSaleGraph(){

	var ref1 = firebase.database().ref('Ticket');
	var day = 0;
	var year = 0;
	var count3 = 0;


	var ref = firebase.database().ref("Ticket");
	ref.on("value", function(snapshot2) {


		


		ref1
		.on('child_added', function(snapshot) { 
			var ticket = snapshot.val();
			if (ticket.type == 'year') {

				year += 1;

			}else if(ticket.type == 'normal'){
				day += 1;
			}

			count3 += 1;


			if (count3 == snapshot2.numChildren()) {
				
				showSaleGraph2(day,year);
				
			}




		});


		
	})

}


function showSaleGraph2(day,year){


	var day2 = day*500;
	var year2 = year * 999; 

	document.getElementById("day_txt2").innerHTML = "ตั๋วรายวัน : " + ((day2*100)/(day2+year2)).toFixed(2) +" % ";
	document.getElementById("year_txt2").innerHTML = "ตั๋วรายปี : " + ((year2*100)/(day2+year2)).toFixed(2) +" % ";


	new Chart(document.getElementById("ticket_chart2"), {
		type: 'doughnut',
		data: {
			labels: ["ตั๋วรายวัน", "ตั๋วรายปี"],
			datasets: [
			{
				label: "Population (millions)",
				backgroundColor: ["#5371a3", "#a35e84"],
				data: [((day2*100)/(day2+year2)).toFixed(2),((year2*100)/(day2+year2)).toFixed(2)]
			}
			]
		},
		options: {
			title: {
				display: true
			}
		}
	});

}
