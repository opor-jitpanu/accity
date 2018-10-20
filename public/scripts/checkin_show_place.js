window.onload = function(){
	var x = document.getElementById("btnCheckin");
	x.style.display = "none";

	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var place = url.searchParams.get("place");

	var ref = firebase.database().ref("Place");
	ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
		snapshot.forEach(function(data) {


			var storageRef = firebase.storage().ref();
			var spaceRef = storageRef.child('images/'+place+'.jpg');
			storageRef.child('images/'+place+'.jpg').getDownloadURL().then(function(url) {
				var test = url;
				document.getElementById('image1').src= url;
				

			}).catch(function(error) {

			});


			
			document.getElementById("name_head").innerHTML = data.child("name").val();
		});
	});
	
	

	getID(place);
	showBtn(place);

}


function showBtn(place){

	firebase.auth().onAuthStateChanged(function(user) {
		
		var ref2 = firebase.database().ref("Checkin");
		var ref = firebase.database().ref("Checkin");
		var check = '';
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var id = data.key;
				ref2.once("value")
				.then(function(snapshot){
					
					var location = snapshot.child(id).child("location").val();
					if (location == place) {//CHECKED
						// var x = document.getElementById("btnCheckin");
						// x.style.display = "none";
						// console.log("CHECKED");
						check = "checked";
						console.log("1");
					}else if (location !== place && check == 'checked') {
						check = "checked";
						console.log("2");
					}else if (location !== place && check !== 'checked') {
						check = "no";
						console.log("3");
					}


					if (check == "no") {
						console.log("block");
						var x = document.getElementById("btnCheckin");
						x.style.display = "block";
						document.getElementById("check1_txt").innerHTML = "You can Check In";
					}else if (check == "checked") {
						console.log("none");
						var x = document.getElementById("btnCheckin");
						x.style.display = "none";
						document.getElementById("check1_txt").innerHTML = "You are Checked";
					}

				});


			});

		});
		

	});
}





function getID(place){
	var ref = firebase.database().ref("Place");
	ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;
			showInfo(id);
		});
	});
}

function showInfo(id){
	var ref = firebase.database().ref("Place");
	ref.once("value")
	.then(function(snapshot){
		var place_id = snapshot.child(id).child("place_id").val().substr(1).slice(0);
		document.getElementById("point_txt").innerHTML = "Place ID : " + place_id;
	});

	ref.once("value")
	.then(function(snapshot){
		var description = snapshot.child(id).child("description").val();
		document.getElementById("description_txt").innerHTML = "Description : " + description;
	});

	ref.once("value")
	.then(function(snapshot){
		var point = snapshot.child(id).child("point").val();
		document.getElementById("point2_txt").innerHTML = "Point : " + point;
	});


}


function getScoreOnClick(){

	var count = 0;

	firebase.auth().onAuthStateChanged(function(user) {
		showId2(user.email, count);
	});

	function showId2(email, count){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var id = data.key;
				// console.log(id);
				getScoreUser(id,count);
			});
		});

	}


	function getScoreUser(id, count){
		var ref = firebase.database().ref("User");
		ref.once("value")
		.then(function(snapshot){
			var score = snapshot.child(id).child("point").val();
			// console.log(score);
			
			getIdPlace(score, count);

		});
	}


	function getIdPlace(userscore, count){
		var url_string = window.location.href; //window.location.href
		var url = new URL(url_string);
		var place = url.searchParams.get("place");
		var ref = firebase.database().ref("Place");
		ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var place_id = data.key;
				getScorePlace(userscore, place_id, count);
				// console.log(userscore, place_id, count);
			});
		});
	}


	function getScorePlace(userscore, place_id, count){
		var ref3 = firebase.database().ref("Place");
		ref3.once("value")
		.then(function(snapshot){
			var placescore = snapshot.child(place_id).child("point").val();
			
			AddPoint(userscore, placescore, count);
			// console.log(userscore, placescore,1);
			

		});


	}






	function AddPoint(userscore, placescore, count){
		// console.log("addpoiunt : " + count);

		firebase.auth().onAuthStateChanged(function(user) {

			FindID(user.email,userscore, placescore, count);
		});

		function FindID(email,userscore, placescore, count){

			var ref = firebase.database().ref("User");
			ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					ChangePoint(data.key, userscore, placescore, email, count);
				});
			});
		}
	}
	function ChangePoint(id, userscore, placescore, email, count){
		

		var today2 = new Date();
		var dd2 = today2.getDate();
		var mm2 = today2.getMonth()+1;
		var yyyy2 = today2.getFullYear();

		if(dd2<10) {
			dd2 = '0'+dd2
		} 

		if(mm2<10) {
			mm2 = '0'+mm2
		} 

		today2 = dd2 + '/' + mm2 + '/' + yyyy2;




		var url_string = window.location.href;
		var url = new URL(url_string);
		var place = url.searchParams.get("place");




		var d2 = new Date(); 
		var hour2 = d2.getHours(); 
		var minute2 = d2.getMinutes();

		if (minute2 < 10) {
			minute2 = '0' + minute2;
		}

		var time2 = hour2 + ":" + minute2;

		var firebaseRef = firebase.database().ref("Checkin");
		
		
		firebaseRef.push({
			email:email,
			location:place,
			time_checkin:time2,
			date:today2
		});

		UpdatePoint(id, userscore, placescore, email, count);
		

	}


	function UpdatePoint(id, userscore, placescore, email, count){
		var sum_score = parseInt(userscore) + parseInt(placescore);
		var ref = firebase.database().ref("User");
		ref.child(id)
		.update({ point: sum_score
		});
		window.location.href = "checkin_complete.html";
	}
}
















