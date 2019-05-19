window.onload = function(){

	if (sessionStorage.getItem("login") == 'yes') {

		var ref = firebase.database().ref('Place');
		ref
		.on('child_added', function(snapshot) { 
			var place = snapshot.val();
			
			addInDropdown(place.name, place.place_id);
			

		});

	}else{
		window.location.href = "login.html";
	}


	

}







function showfGenderGraph(male,female){

	document.getElementById("day_txt2").innerHTML = "เพศชาย : " + (male) +" คน";
	document.getElementById("year_txt2").innerHTML = "เพศหญิง : " + (female) +" คน";


	new Chart(document.getElementById("ticket_chart2"), {
		type: 'doughnut',
		data: {
			labels: ["ชาย", "หญิง"],
			datasets: [
			{
				label: "Population (millions)",
				backgroundColor: ["#5371a3", "#a35e84"],
				data: [male,female]
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












function addInDropdown(name, id){

	var ddl = document.getElementById("t1");
	var option = document.createElement("OPTION");



	option.innerHTML = 'ID : ' + id +"  "+name;
	option.value = id;
	ddl.options.add(option);



}



function submitMaleOnClick(){
	var count = 0;
	var time = 1;

	var male = 0;
	var female = 0;
	

	var place_id = document.getElementById('t1').value;
	


	var ref = firebase.database().ref('Checkin');
	var ref2 = firebase.database().ref('User');
	ref
	.orderByChild('location')
	.equalTo(place_id)
	.on('child_added', function(snapshot) { 
		var user = snapshot.val();

		email = user.email;
		
		ref2.orderByChild('email')
		.equalTo(email)
		.on('child_added', function(snapshot) { 

			var user2 = snapshot.val();
			sex = user2.sex;
			email2 = user2.email;
			console.log(sex);
			if (sex == 'male') {
				male += 1;
				console.log(email2);
			}else if(sex == "female"){
				female += 1;
				console.log(email2);
			}

			showfGenderGraph(male, female);

		});
		// console.log(email);
		count += 1;

		document.getElementById("text_count").innerHTML = "นักท่องเที่ยวเช็คอินสถานที่นี้ทั้งหมด : " + count +" คน";

	});
}