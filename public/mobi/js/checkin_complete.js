window.onload = function(){

	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var score = url.searchParams.get("sum");
	var allscore = url.searchParams.get("allscore");

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
		var ref = firebase.database().ref("User");
		ref.child(id)
		.update({ point: sum
		});
		ref.child(id)
		.update({ point_all: parseInt(allscore)
		});
		document.getElementById("point_txt").innerHTML = "Your current point : " + sum;


		var timer2 =setTimeout(function() { 
			window.location.href = "checkin.html";
		}, 1000);


		document.getElementById("loading").style.display = 'none';
	}
	
}
