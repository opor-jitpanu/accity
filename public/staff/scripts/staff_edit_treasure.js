window.onload = function(){


	var ref = firebase.database().ref('TreasurePlace');
	ref
	.orderByKey()
	.equalTo('key')
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();

		document.getElementById("place_name1").innerHTML = "Place 1 : ex. p100";
		document.getElementById("name_text1").value = place.one;

		document.getElementById("place_name2").innerHTML = "Place 2 : ex. p101";
		document.getElementById("name_text2").value = place.two;

		document.getElementById("place_name3").innerHTML = "Place 3 : ex. p102";
		document.getElementById("name_text3").value = place.three;

		document.getElementById("place_name4").innerHTML = "Place 4 : ex. p103";
		document.getElementById("name_text4").value = place.four;

		document.getElementById("place_name5").innerHTML = "Place 4 : ex. p104";
		document.getElementById("name_text5").value = place.five;
		
	});

}







function submitOnClick(){


	var place1 = document.getElementById('name_text1').value;
	var place2 = document.getElementById('name_text2').value;
	var place3 = document.getElementById('name_text3').value;
	var place4 = document.getElementById('name_text4').value;
	var place5 = document.getElementById('name_text5').value;


	


	
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
				window.location.href = "staff_edit_treasure.html";
			}
		});
	
}


