


window.onload = function(){
	
	if (sessionStorage.getItem("login") == 'yes') {
		document.getElementById('btn_refresh').style.visibility = 'hidden';
		document.getElementById('btn_return').style.visibility = 'hidden';

		sessionStorage.removeItem('score');

		sessionStorage.removeItem('point_rd');

		sessionStorage.removeItem('email_rd');

		sessionStorage.removeItem('id_rd');
		
	}else{
		window.location.href = "login.html";
	}
}




function cameraOnclick(){


	let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
	scanner.addListener('scan', function (content) {
		console.log(content);
		document.getElementById("reward_id").value = content;
	});
	Instascan.Camera.getCameras().then(function (cameras) {
		if (cameras.length > 0) {
			scanner.start(cameras[0]);
		} else {
			console.error('No cameras found.');
		}
	}).catch(function (e) {
		console.error(e);
	});

}




function CheckRewardOnClick() {
	var reward_id = document.getElementById('reward_id').value;





	var ref = firebase.database().ref('Code');
	ref
	.orderByKey()
	.equalTo(reward_id)
	.on('child_added', function(snapshot) { 
		var code = snapshot.val();
		console.log(code.status);


		if (code.status == 'used') {
			document.getElementById("txt_success").innerHTML = '<i class="fa fa-close"></i>  รหัสรางวัลนี้ใช้ไปแล้ว';
			document.getElementById('btn_refresh').style.visibility = 'visible';
			
		}else{



			var ref = firebase.database().ref("Code");
			ref.orderByKey().equalTo(reward_id).on("value", function(snapshot) {



				var value = snapshot.val();

				if (value) {


					snapshot.forEach(function(data) {
						var id = data.key;

						ref.once("value")
						.then(function(snapshot){
							var email = snapshot.child(id).child("email").val();
							var status = snapshot.child(id).child("status").val();
							var id3 = snapshot.child(id).child("id").val();

							document.getElementById("email_user").innerHTML = 'อีเมลนักท่องเที่ยว : ' + email;
							document.getElementById("email2").innerHTML = email;








							showReward(id3,reward_id);
							chageStatus(reward_id);





						});



					});

				} else {
					console.log('not found');
					document.getElementById("txt_success").innerHTML = '<i class="fa fa-close"></i>  รหัสไม่ถูกต้อง ไม่พบของรางวัล';
					document.getElementById('btn_refresh').style.visibility = 'visible';
				}







			});


		}
		
	});

















	var ref = firebase.database().ref("Code");
	ref.orderByKey().equalTo(reward_id).on("value", function(snapshot) {

		var value = snapshot.val();

		if (value) {


		} else {
			console.log('not found');
			document.getElementById("txt_success").innerHTML = '<i class="fa fa-close"></i>  รหัสไม่ถูกต้อง ไม่พบของรางวัล';
			document.getElementById('btn_refresh').style.visibility = 'visible';
		}

	});




















}



function showReward(id, reward_id){


	var ref = firebase.database().ref("Reward");
	ref.orderByKey().equalTo(id).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;

			ref.once("value")
			.then(function(snapshot){
				var name = snapshot.child(id).child("name").val();
				var description = snapshot.child(id).child("description").val();
				var point = snapshot.child(id).child("point").val();

				document.getElementById("txt_success").innerHTML = '<i class="fa fa-flag-checkered"></i> แลกของรางวัลสำเร็จ';
				document.getElementById("reward_name").innerHTML = 'ชื่อของรางวัล : ' + name;
				document.getElementById("description").innerHTML = 'รายละเอียด : ' + description;
				document.getElementById("point").innerHTML = 'คะแนน : ' + point;
				document.getElementById("point2").innerHTML = point;
				sessionStorage.setItem("score", point);

				document.getElementById('btn_refresh').style.visibility = 'visible';
				document.getElementById('btn_return').style.visibility = 'visible';





			});



		});
	});



}



function refreshOnclick(){
	window.location.href = "redeem.html";
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







function returnOnclick(){


	var reward_id = document.getElementById('reward_id').value;

	var node = document.getElementById('point2');

	var email_node = document.getElementById('email2');

	var point = node.textContent;
	var email = email_node.textContent;

	console.log(email);

	var ref = firebase.database().ref("User");
	ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

		snapshot.forEach(function(data) {

			var id = data.key;

			showPoint(data.key);

		});
	});


	function showPoint(id){
		var reward_id = document.getElementById('reward_id').value;
		var ref = firebase.database().ref("User");
		ref.once("value")
		.then(function(snapshot){
			var point_user = snapshot.child(id).child("point").val();

			var pointreward = sessionStorage.getItem("score");

			var updatepoint = parseInt(point_user) + parseInt(pointreward);
			console.log(point_user + " : " + pointreward);

			AddPoint(updatepoint ,email, id);




		});
	}


	function AddPoint(point3, email, id){

		var point2 = point3.toString();



		console.log(point3 +" : "+ email +" : "+ id)

		sessionStorage.setItem("point_rd", point3);

		sessionStorage.setItem("email_rd", email);

		sessionStorage.setItem("id_rd", id);

		window.location.href = "redeem_return_point.html";

		// firebase.database().ref("User").child(id).update({
		// 	point: point2

		// }, function(error) {
		// 	if (error) {
		// 		alert(error);
		// 	} else {

		// 		window.location.href = "redeem.html";

		// 	}
		// });

	}

}






