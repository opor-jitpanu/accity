
window.onload = function(){

	firebase.auth().onAuthStateChanged(function(user) {
		// var email = user.email;
		// console.log(email);
		

		emailVerified = user.emailVerified;

		console.log(emailVerified);

		// if (emailVerified) {



			show();

		// }else{
			

			

		// 	alert('Please Vertify this Email or resend email vertify');
		// 	window.location.href = "profile.html";
		// 	console.log("Not Login");
			
		// }




		
	});

}












function show(){

	var mydiv = document.getElementById('list');



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
			document.getElementById("point").innerHTML = "My Points : "+point;
		});
	}



	var userDataRef = firebase.database().ref("Reward");
	var storageRef = firebase.storage().ref();
	userDataRef.once("value").then(function(snapshot) {
		// var mydiv = document.getElementById('box1');

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
				

				// var div = '<div class="container"><div class="col-md-4"><div class="card"><div class="image pull-left" ><img class="card-img-top" src="'+ test +'" alt="Card image cap"></div><div class="content pull-left"><p>'+name+'</p><p>'+description+'</p><p>Use point : '+point+'</p><p id="btnlink2"></p><center><a href="reward_show.html?id='+key+'&id2='+id+'"><button class="btn btn-primary">More Information</button></a><center><br></div><div class="clearfix"></div></div></div></div> <br>';

				// mydiv.innerHTML += div;




				var div = '<a href="reward_show.html?id='+key+'&id2='+id+'">'+'<li><div class="swiper-wrapper"><div class="swiper-slide swipeout-content item-content"><div class="post_entry"><div class="post_thumb"><img src="'+test+'" alt="" title="" /></div><div class="post_details"><div class="post_category">'+name+'</div><h2>'+'Point : '+point+'</h2></div></div></div></div></li></a>';

				mydiv.innerHTML += div;

				document.getElementById("loading").style.display = 'none';



			}).catch(function(error) {

				console.log(error);

			});



		});

		

	});

}