window.onload = function(){



	if (sessionStorage.getItem("login") == 'yes') {
		var ref = firebase.database().ref('TreasurePlace');
		ref
		.orderByKey()
		.equalTo('key')
		.on('child_added', function(snapshot) { 
			var place = snapshot.val();

			document.getElementById("place1_txt").value = place.one;

			document.getElementById("place2_txt").value = place.two;

			document.getElementById("place3_txt").value = place.three;

			document.getElementById("place4_txt").value = place.four;

			document.getElementById("place5_txt").value = place.five;
			
		});
	}else{
		window.location.href = "login.html";
	}


	

}







function submitOnClick(){


	var place1 = document.getElementById('place1_txt').value;
	var place2 = document.getElementById('place2_txt').value;
	var place3 = document.getElementById('place3_txt').value;
	var place4 = document.getElementById('place4_txt').value;
	var place5 = document.getElementById('place5_txt').value;


	


	
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


