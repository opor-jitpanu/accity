window.onload = function(){

	

	firebase.auth().onAuthStateChanged(function(user) {


		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var id = data.key;

				ref.once("value")
				.then(function(snapshot){

					var email = snapshot.child(id).child("email").val();

					var ref2 = firebase.database().ref('Treasure');
					ref2
					.orderByChild('email')
					.equalTo(email)
					.on('child_added', function(snapshot) { 
						var user = snapshot.val();

						if (user.one == 'lock') {
							place1();

						}else if(user.two == 'lock'){

							place2();

						}else if(user.three == 'lock'){

							place3();

						}else if(user.four == 'lock'){

							place4();

						}else if(user.five == 'lock'){

							place5();

						}else{
							finish();
						}
					});
				});
			});
		});
	});

}


function place1(){

	var elem = document.getElementById("myBar"); 
	var width = 1;
	var id = setInterval(frame, 10);
	function frame() {
		if (width >= 1) {
			clearInterval(id);
		} else {
			width++; 
			elem.style.width = width + '%'; 
		}
	}

	var storageRef = firebase.storage().ref();
	var spaceRef = storageRef.child('images/'+'p152'+'.jpg');
	storageRef.child('images/'+'p152'+'.jpg').getDownloadURL().then(function(url) {
		var test = url;
		document.getElementById('image1').src= url;


	}).catch(function(error) {

	});

	var ref = firebase.database().ref('Place');
	ref
	.orderByChild('place_id')
	.equalTo('p152')
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();
		
		document.getElementById("name_head").innerHTML = place.name;
		document.getElementById("description_txt").innerHTML = place.description;


		var link = document.getElementById("btnGoogleMap");
		link.setAttribute('href', "https://maps.google.com/?q="+place.latitude+","+place.longtitude);

		document.getElementById("btnCheckin").onclick = get1;





		var x = document.getElementById("location");
		navigator.geolocation.getCurrentPosition(showPosition);
		function showPosition(position) {
			var R = 6371; 
			var dLat = deg2rad(position.coords.latitude-place.latitude);  
			var dLon = deg2rad(position.coords.longitude-place.longtitude); 
			var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(place.latitude)) * Math.cos(deg2rad(position.coords.latitude)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; 

			console.log((d*1000).toFixed(0));


			if (((d*1000).toFixed(0))<= 100) {
				document.getElementById("btnCheckin").style.display = 'block';
			}else{
				document.getElementById("btnCheckin").style.display = 'block';  //none
			}
		}
		document.getElementById("loading").style.display = "none";
	});

}


function get1(){


	
}


function deg2rad(deg) {
	return deg * (Math.PI/180)
}



function place2(){

}

function place3(){

}

function place4(){

}

function place5(){

}

function finish(){

}