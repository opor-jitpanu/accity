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
				document.getElementById("place_id").innerHTML = "Place ID : " + place_id;
				document.getElementById("btn_place_id").innerHTML = '<a href="staff_change_id.html?place='+place_id+'" ><button class="btn btn-primary">Edit</button></a>';
			});

			ref.once("value")
			.then(function(snapshot){
				var place_name = snapshot.child(id).child("name").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_name").innerHTML = "Place Name : " + place_name;
				document.getElementById("btn_place_name").innerHTML = '<a href="staff_change_name.html?place='+place_id+'" ><button class="btn btn-primary">Edit</button></a>';
			});

			ref.once("value")
			.then(function(snapshot){
				var place_point = snapshot.child(id).child("point").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_point").innerHTML = "Place Point : " + place_point;
				document.getElementById("btn_place_point").innerHTML = '<a href="staff_change_point.html?place='+place_id+'" ><button class="btn btn-primary">Edit</button></a>';
			});

			ref.once("value")
			.then(function(snapshot){
				var place_description = snapshot.child(id).child("description").val();
				var place_id = snapshot.child(id).child("place_id").val();
				document.getElementById("place_description").innerHTML = "Place Description : " + place_description;
				document.getElementById("btn_place_description").innerHTML = '<a href="staff_change_description.html?place='+place_id+'" ><button class="btn btn-primary">Edit</button></a>';
			});

		});
	});


}