window.onload = function(){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var place = url.searchParams.get("place");

	var ref = firebase.database().ref("Reward");
	ref.orderByChild('id').equalTo(place).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;
			var ref2 = firebase.database().ref("Reward");

			

			ref.once("value")
			.then(function(snapshot){
				var reward_name = snapshot.child(id).child("name").val();
				document.getElementById("name_txt").value = reward_name;

				var reward_point = snapshot.child(id).child("point").val();
				document.getElementById("point_txt").value = reward_point;

				var reward_description = snapshot.child(id).child("description").val();
				document.getElementById("description_txt").value = reward_description;
			});

			

			

		});
	});


}


function submitOnClick(){
	var name = document.getElementById('name_txt').value;
	var description = document.getElementById('description_txt').value;
	var point = document.getElementById('point_txt').value;



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

		var ref = firebase.database().ref("Reward");
		ref.orderByChild('id').equalTo(place).on("value", function(snapshot) {
			snapshot.forEach(function(data) {

				edit(data.key);
			});
		});
	}

	function edit(id){

		firebase.database().ref("Reward").child(id).update({
			name : name,
			description : description,
			point : point
		}, function(error) {
			if (error) {
				alert(error);
			} else {
				window.location.href = "reward.html";
			}
		});

	}
}


























