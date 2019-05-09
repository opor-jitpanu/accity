window.onload = function(){

	var url_string = window.location.href; 
	var url = new URL(url_string);
	var place = url.searchParams.get("place");

	var ref = firebase.database().ref("Place");
	ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;
			var ref2 = firebase.database().ref("Place");


			ref.once("value")
			.then(function(snapshot){

				document.getElementById("place_id_text").innerHTML = "Place ID : " + snapshot.child(id).child("place_id").val();
				document.getElementById("name_txt").value = snapshot.child(id).child("name").val();
				document.getElementById("description_txt").value = snapshot.child(id).child("description").val();
				document.getElementById("point_txt").value = snapshot.child(id).child("point").val();
				document.getElementById("latitude_txt").value = snapshot.child(id).child("latitude").val();
				document.getElementById("longtitude_txt").value = snapshot.child(id).child("longtitude").val();

			});

			

		});
	});


}


function submit(){
	var name = document.getElementById('name_txt').value;
	var description = document.getElementById('description_txt').value;
	var point = document.getElementById('point_txt').value;
	var latitude = document.getElementById('latitude_txt').value;
	var longtitude = document.getElementById('longtitude_txt').value;



	var url_string = window.location.href;
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

				edit(data.key);
			});
		});
	}

	function edit(id){
		firebase.database().ref("Place").child(id).update({
			name: name,
			description: description,
			point : point,
			latitude : latitude,
			longtitude : longtitude
		}, function(error) {
			if (error) {
				alert(error);
			} else {
				window.location.href = "place.html";
			}
		});
	}
}


