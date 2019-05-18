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



function seeOld(){

	var ref = firebase.database().ref('TreasurePlace');
	ref
	.orderByKey()
	.equalTo('key')
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();

		$("#t1").val(place.one);

		$("#t2").val(place.two);
		$("#t3").val(place.three);
		$("#t4").val(place.four);
		$("#t5").val(place.five);



	});

}



function addInDropdown(name, id){

	var ddl = document.getElementById("t1");
	var option = document.createElement("OPTION");

	var ddl2 = document.getElementById("t2");
	var option2 = document.createElement("OPTION");

	var ddl3 = document.getElementById("t3");
	var option3 = document.createElement("OPTION");

	var ddl4 = document.getElementById("t4");
	var option4 = document.createElement("OPTION");

	var ddl5 = document.getElementById("t5");
	var option5 = document.createElement("OPTION");


	option.innerHTML = 'ID : ' + id +"  "+name;
	option.value = id;
	ddl.options.add(option);

	option2.innerHTML = 'ID : ' + id +"  "+name;
	option2.value = id;
	ddl2.options.add(option2);

	option3.innerHTML = 'ID : ' + id +"  "+name;
	option3.value = id;
	ddl3.options.add(option3);

	option4.innerHTML = 'ID : ' + id +"  "+name;
	option4.value = id;
	ddl4.options.add(option4);

	option5.innerHTML = 'ID : ' + id +"  "+name;
	option5.value = id;
	ddl5.options.add(option5);

}



function submitOnClick(){



	var place1 = document.getElementById('t1').value;
	var place2 = document.getElementById('t2').value;
	var place3 = document.getElementById('t3').value;
	var place4 = document.getElementById('t4').value;
	var place5 = document.getElementById('t5').value;

	
	
	firebase.database().ref("TreasurePlace").child('key').update({
		one: place1,
		two: place2,
		three : place3,
		four : place4,
		five : place5
	}, function(error) {
		if (error) {
			alert(error);
		} else {
			window.location.href = "treasure.html";
		}
	});
	
}


