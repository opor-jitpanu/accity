window.onload = function(){

	// var url_string = window.location.href;
	// var url = new URL(url_string);





	var score = sessionStorage.getItem("sum");
	var allscore = sessionStorage.getItem("allscore");

	var sum = window.atob(score);
	console.log(sum);

	



	firebase.auth().onAuthStateChanged(function(user) {

		FindID(user.email);
	});

	function FindID(email){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				AddPoint(data.key);
			});
		});

	}

	

	function AddPoint(id){





		firebase.database().ref("User").child(id).update({
			point: sum,
			point_all: parseInt(allscore)
		}, function(error) {
			if (error) {
				alert(error);
			} else {
				document.getElementById("point_txt").innerHTML = "Your current point : " + sum;


				var timer2 =setTimeout(function() { 
					sessionStorage.clear();
					window.location.href = "checkin.html";
				}, 1000);


				document.getElementById("loading").style.display = 'none';
			}
		});





		
	}
	
}
