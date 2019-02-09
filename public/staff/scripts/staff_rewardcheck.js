function CheckRewardOnClick() {
	var reward_id = document.getElementById('reward_id').value;

	var ref = firebase.database().ref("Code");
	ref.orderByKey().equalTo(reward_id).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;

			ref.once("value")
			.then(function(snapshot){
				var email = snapshot.child(id).child("email").val();
				var status = snapshot.child(id).child("status").val();
				var id3 = snapshot.child(id).child("id").val();

				document.getElementById("email_user").innerHTML = 'Email : ' + email;
				document.getElementById("status_user").innerHTML = 'Key Status : ' + status;
				showReward(id3);
			});
		});
	});



}

function BackHome(){
	window.location.href = "index_staff.html";
}


function showReward(id){


	var ref = firebase.database().ref("Reward");
	ref.orderByKey().equalTo(id).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;

			ref.once("value")
			.then(function(snapshot){
				var name = snapshot.child(id).child("name").val();
				var description = snapshot.child(id).child("description").val();
				var point = snapshot.child(id).child("point").val();

				document.getElementById("reward_name").innerHTML = 'Reward Name : ' + name;
				document.getElementById("description").innerHTML = 'Reward Description : ' + description;
				document.getElementById("point").innerHTML = 'Reward Point : ' + point;
				
			});
		});
	});



}