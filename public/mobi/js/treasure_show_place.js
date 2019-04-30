window.onload = function(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var unlock = url.searchParams.get("place");


	var ref = firebase.database().ref('TreasurePlace');
	ref
	.orderByKey()
	.equalTo('key')
	.on('child_added', function(snapshot) { 
		var place = snapshot.val();
		if (unlock == 'one') {
			showData(place.one);
		}
		else if (unlock == 'two') {
			showData(place.two);
		}
		else if (unlock == 'three') {
			showData(place.three);
		}
		else if (unlock == 'four') {
			showData(place.four);
		}
		else if (unlock == 'five') {
			showData(place.five);
		}
	});
	
}


function showData(place_id){

	console.log(place_id);
	var storageRef = firebase.storage().ref();
	var spaceRef = storageRef.child('images/'+place_id+'.jpg');
	storageRef.child('images/'+place_id+'.jpg').getDownloadURL().then(function(url) {
		var test = url;
		document.getElementById('image1').src= url;


	}).catch(function(error) {

	});

	var ref = firebase.database().ref('Place');
	ref
	.orderByChild('place_id')
	.equalTo(place_id)
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

function deg2rad(deg) {
	return deg * (Math.PI/180)
}



function get1(){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var unlock = url.searchParams.get("place");
	if (unlock == 'one') {

		firebase.auth().onAuthStateChanged(function(user) {
		var ref = firebase.database().ref("Treasure");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				firebase.database().ref("Treasure").child(data.key).update({
					one: 'unlock'
				}, function(error) {
					if (error) {
						alert(error);
					} else {
						window.location.href = "treasure.html";
					}
				});
			});
		});
	});

	}else if(unlock == 'two'){

		firebase.auth().onAuthStateChanged(function(user) {
		var ref = firebase.database().ref("Treasure");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				firebase.database().ref("Treasure").child(data.key).update({
					two: 'unlock'
				}, function(error) {
					if (error) {
						alert(error);
					} else {
						window.location.href = "treasure.html";
					}
				});
			});
		});
	});

	}else if(unlock == 'three'){

		firebase.auth().onAuthStateChanged(function(user) {
		var ref = firebase.database().ref("Treasure");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				firebase.database().ref("Treasure").child(data.key).update({
					three: 'unlock'
				}, function(error) {
					if (error) {
						alert(error);
					} else {
						window.location.href = "treasure.html";
					}
				});
			});
		});
	});
		
	}else if(unlock == 'four'){

		firebase.auth().onAuthStateChanged(function(user) {
		var ref = firebase.database().ref("Treasure");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				firebase.database().ref("Treasure").child(data.key).update({
					four: 'unlock'
				}, function(error) {
					if (error) {
						alert(error);
					} else {
						window.location.href = "treasure.html";
					}
				});
			});
		});
	});
		
	}else if(unlock == 'five'){

		firebase.auth().onAuthStateChanged(function(user) {
		var ref = firebase.database().ref("Treasure");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				firebase.database().ref("Treasure").child(data.key).update({
					five: 'unlock'
				}, function(error) {
					if (error) {
						alert(error);
					} else {
						window.location.href = "treasure.html";
					}
				});
			});
		});
	});
		
	}

	
}

