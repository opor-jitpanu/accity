














window.onload = function(){

	var mydiv = document.getElementById('list');



	firebase.auth().onAuthStateChanged(function(user) {

		showData(user.email);
	});

	




	

	
	
	function showData(email_page){
		var userDataRef = firebase.database().ref("Code");
		var storageRef = firebase.storage().ref();
		userDataRef.once("value").then(function(snapshot) {
		// var mydiv = document.getElementById('box1');

		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var key_code = childSnapshot.key;

			var email = childSnapshot.val().email;


			if (email == email_page) {


				var id = childSnapshot.val().id;
				var status = childSnapshot.val().status;



				var ref = firebase.database().ref("Reward").orderByKey().equalTo(id);
				ref.on('child_added', function(snapshot) { 
					var user = snapshot.val();
					var key = childSnapshot.key;
					var name = user.name;
					var id = user.id;


					var spaceRef = storageRef.child('rewards/'+id+'.jpg');




					storageRef.child('rewards/'+id+'.jpg').getDownloadURL().then(function(url) {
						var test = url;

						


						if (true) {}

						var div = '<li><div class="swiper-wrapper"><div class="swiper-slide swipeout-content item-content"><div class="post_entry"><div class="post_thumb"><img src="'+test+'" alt="" title="" /></div><div class="post_details"><div class="post_category"><a href="reward_history_show.html?id='+key_code+'">'+name+'</a></div><h2>'+'Status : '+status+'</h2></div></div></div></div></li>';

						mydiv.innerHTML += div;

				



			}).catch(function(error) {

				console.log(error);

			});








			


		});



				

			}

			



		});

		

	});
	}

}