


window.onload = function(){
	
	if (sessionStorage.getItem("login") == 'yes') {
		
	}else{
		window.location.href = "login.html";
	}
}









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
				chageStatus(reward_id);
			});
		});
	});



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






function chageStatus(id){


	var d = new Date(); 
	var hour = d.getHours(); 
	var minute = d.getMinutes();

	if (minute < 10) {
		minute = '0' + minute;
	}

	var time = hour + ":" + minute;

	var today_in = new Date();
	var dd_in = today_in.getDate();
	var mm_in = today_in.getMonth()+1;
	var yyyy_in = today_in.getFullYear();

	if(dd_in<10) {
		dd_in = '0'+dd_in;
	} 

	if(mm_in<10) {
		mm_in = '0'+mm_in;
	} 

	date = dd_in + '/' + mm_in + '/' + yyyy_in;


	var ref = firebase.database().ref("Code");
	ref.child(id)
	.update({ status : "used",
		time:time,
		date:date

	});

}