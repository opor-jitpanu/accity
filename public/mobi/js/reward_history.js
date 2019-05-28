
window.onload = function(){

	var mydiv = document.getElementById('list');

	var mydiv_used = document.getElementById('used_list');

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

						
						var check = '';
						if (status != 'used') {
							var div = '<a href="reward_history_show.html?id='+key_code+'&check=yes'+'"><li><div class="swiper-wrapper"><div class="swiper-slide swipeout-content item-content"><div class="post_entry"><div class="post_thumb"><img src="'+test+'" alt="" title="" /></div><div class="post_details"><div class="post_category">'+name+'</div><h2>'+'You can use this code.'+'</h2></div></div></div></div></li></a>';

							mydiv.innerHTML += div;
						}else{
							var div = '<a href="reward_history_show.html?id='+key_code+'&check=no'+'"><li><div class="swiper-wrapper"><div class="swiper-slide swipeout-content item-content"><div class="post_entry"><div class="post_thumb"><img src="'+test+'" alt="" title="" /></div><div class="post_details"><div class="post_category">'+name+'</div><h2>'+'Code is Used.'+'</h2></div></div></div></div></li></a>';

							mydiv_used.innerHTML += div;
						}
						
						document.getElementById("loading").style.display = 'none';
						





					}).catch(function(error) {

						console.log(error);

					});











				});



				

			}

			



		});

		

	});
	}

	document.getElementById("loading").style.display = 'none';

}