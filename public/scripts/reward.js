
window.onload = function(){





	firebase.auth().onAuthStateChanged(function(user) {

		showId(user.email);
	});

	function showId(email){
		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

			snapshot.forEach(function(data) {

				var id = data.key;

				showPoint(data.key);
			});
		});

	}
	function showPoint(id){
		var ref = firebase.database().ref("User");
		ref.once("value")
		.then(function(snapshot){
			var point = snapshot.child(id).child("point").val();
			document.getElementById("point").innerHTML = "My point "+point;
		});
	}





	

	
	

	var userDataRef = firebase.database().ref("Reward");
	var storageRef = firebase.storage().ref();
	userDataRef.once("value").then(function(snapshot) {
		var mydiv = document.getElementById('box1');

		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var id = childSnapshot.val().id;
			var name = childSnapshot.val().name;
			var point = childSnapshot.val().point;
			var description = childSnapshot.val().description;

			console.log(id);
			console.log(key);




			var spaceRef = storageRef.child('rewards/'+id+'.jpg');



			storageRef.child('rewards/'+id+'.jpg').getDownloadURL().then(function(url) {
				var test = url;
				
				console.log(url);
				

				var div = '<div class="container"><div class="col-md-4"><div class="card"><div class="image pull-left" ><img class="card-img-top" src="'+ test +'" alt="Card image cap"></div><div class="content pull-left"><p>'+name+'</p><p>'+description+'</p><p>Use point : '+point+'</p><p id="btnlink2"></p><center><a href="reward_show.html?id='+key+'&id2='+id+'"><button class="btn btn-primary">More Information</button></a><center><br></div><div class="clearfix"></div></div></div></div> <br>';

				mydiv.innerHTML += div;


			}).catch(function(error) {

				console.log(error);

			});



		});

		

	});

}