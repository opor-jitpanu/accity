function CheckRewardOnClick() {
	var email_2 = document.getElementById('email').value;

	

	var userDataRef = firebase.database().ref("Code");
	var ref = firebase.database().ref("Code");
	var table = document.getElementById("myTable");


	console.log('1');
	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key;
			var childData = childSnapshot.val();
			var email = childSnapshot.val().email;

			
			console.log('2');

			if (email == email_2 ) {
				var row = table.insertRow(0);
				var reward_id = childSnapshot.val().id;
				var place_status = childSnapshot.val().status;

				




				var ref = firebase.database().ref("Reward");
				ref.orderByKey().equalTo(reward_id).on("value", function(snapshot) {
					snapshot.forEach(function(data) {
						var id = data.key;

						ref.once("value")
						.then(function(snapshot){
							var reward_name = snapshot.child(id).child("name").val();
							var reward_des = snapshot.child(id).child("description").val();
							var reward_point = snapshot.child(id).child("point").val();
							var cell_place_name = row.insertCell(0);
							cell_place_name.innerHTML = reward_name;
							var cell_place_name = row.insertCell(1);
							cell_place_name.innerHTML = reward_des;
							var cell_place_name = row.insertCell(2);
							cell_place_name.innerHTML = reward_point;
						});
					});
				});



			}










		});
		last();
	});


}

function BackHome(){
	window.location.href = "index_staff.html";
}

function last(){
	var table = document.getElementById("myTable");
	var header = table.createTHead();
	var row = header.insertRow(0);
	var cell = row.insertCell(0);
	cell.innerHTML = "<center><b>Reward Name</b></center>";
	var cell = row.insertCell(1);
	cell.innerHTML = "<center><b>Reward Description</b></center>";
	var cell = row.insertCell(2);
	cell.innerHTML = "<center><b>Reward Point</b></center>";


}

