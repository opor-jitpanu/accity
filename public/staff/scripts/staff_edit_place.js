window.onload = function(){



	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var place = url.searchParams.get("place");

	var ref = firebase.database().ref("Place");
	ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;
			var ref2 = firebase.database().ref("Place");
			ref.once("value")
			.then(function(snapshot){
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_id").innerHTML = "Place ID :  " + place_id;
			});

			ref.once("value")
			.then(function(snapshot){
				var place_name = snapshot.child(id).child("name").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_name").innerHTML = "Place Name";
				document.getElementById("name_text").value = place_name;
			});

			ref.once("value")
			.then(function(snapshot){
				var place_point = snapshot.child(id).child("point").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_point").innerHTML = "Place Point";
				document.getElementById("point_text").value = place_point;
			});

			ref.once("value")
			.then(function(snapshot){
				var place_description = snapshot.child(id).child("description").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_description").innerHTML = "Place Description";
				document.getElementById("description_text").value = place_description;
			});

			ref.once("value")
			.then(function(snapshot){
				var latitude_text1 = snapshot.child(id).child("latitude").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_latitude").innerHTML = "Place Latitude";
				document.getElementById("latitude_text").value = latitude_text1;
			});

			ref.once("value")
			.then(function(snapshot){
				var place_longtitude1 = snapshot.child(id).child("longtitude").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_longtitude").innerHTML = "Place Longtitude";
				document.getElementById("longtitude_text").value = place_longtitude1;
			});

		});
	});


}


function submitOnClick(){
	var name = document.getElementById('name_text').value;
	var description = document.getElementById('description_text').value;
	var point = document.getElementById('point_text').value;
	var latitude = document.getElementById('latitude_text').value;
	var longtitude = document.getElementById('longtitude_text').value;



	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var place = url.searchParams.get("place");


	if (Number.isInteger(parseInt(point))){
		getID(place);
	}
	else{
		alert("Point is not an integer")
	}
	

	


	function getID(place){

		var ref = firebase.database().ref("Place");
		ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
        // alert(data.key);
        edit(data.key);
    });
		});
	}

	function edit(id){
		var ref = firebase.database().ref("Place");
		ref.child(id)
		.update({ name : name,
			description : description,
			point : point,
			latitude : latitude,
			longtitude : longtitude
		});

		window.location.href = "staff_change_place.html";
	}
}


























