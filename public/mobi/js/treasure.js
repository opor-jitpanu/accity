window.onload = function(){


	var center = [13.545634, 100.628851];

	var map = L.map('map').setView(center, 15);

	L.tileLayer(
		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
			maxZoom: 18
		}).addTo(map);



	// var marker = L.marker([13.545634, 100.628851]).addTo(map).on('mouseover', onClick);



	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


	function onClick() {
		console.log('123');
	}

	// document.getElementById("btn_place1").style.display = 'none';
	// document.getElementById("btn_place2").style.display = 'none';
	// document.getElementById("btn_place3").style.display = 'none';
	// document.getElementById("btn_place4").style.display = 'none';
	// document.getElementById("btn_place5").style.display = 'none';






	// var ref = firebase.database().ref('TreasurePlace');
	// var ref2 = firebase.database().ref('Place');
	// ref
	// .orderByKey()
	// .equalTo('key')
	// .on('child_added', function(snapshot) { 
	// 	var place = snapshot.val();

	// 	ref2
	// 	.orderByChild('place_id')
	// 	.equalTo(place.one)
	// 	.on('child_added', function(snapshot) { 
	// 		var place = snapshot.val();

	// 		document.getElementById('btn_place1').innerText = place.name;
	// 	});
	// 	ref2
	// 	.orderByChild('place_id')
	// 	.equalTo(place.two)
	// 	.on('child_added', function(snapshot) { 
	// 		var place = snapshot.val();

	// 		document.getElementById('btn_place2').innerText = place.name;
	// 	});
	// 	ref2
	// 	.orderByChild('place_id')
	// 	.equalTo(place.three)
	// 	.on('child_added', function(snapshot) { 
	// 		var place = snapshot.val();

	// 		document.getElementById('btn_place3').innerText = place.name;
	// 	});
	// 	ref2
	// 	.orderByChild('place_id')
	// 	.equalTo(place.four)
	// 	.on('child_added', function(snapshot) { 
	// 		var place = snapshot.val();

	// 		document.getElementById('btn_place4').innerText = place.name;
	// 	});
	// 	ref2
	// 	.orderByChild('place_id')
	// 	.equalTo(place.five)
	// 	.on('child_added', function(snapshot) { 
	// 		var place = snapshot.val();

	// 		document.getElementById('btn_place5').innerText = place.name;
	// 	});
	// });






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

							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)"; //grey
							document.getElementById("count_place").innerHTML = "Unlock 0/5";
							// document.getElementById("btn_place1").onclick = goto_place1;

							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);




									var myPopup = L.DomUtil.create('div', 'infoWindow');
									myPopup.innerHTML = "<div id='info'><p id='title'>" + place.name + "</p></div>";



									marker2.bindPopup(myPopup).openPopup();




									$('#info', myPopup).on('click', function() {
										goto_place1();
									});



									marker2.on("click", function (event) {
										var clickedMarker = event.layer;
										goto_place1();

									});

								});
							});

							


						}else if(user.two == 'lock'){

							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)"; //pink
							// document.getElementById("btn_place2").style.display = 'block';
							// document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 1/5";
							// document.getElementById("btn_place2").onclick = goto_place2;

							// document.getElementById("btn_place1").onclick = checked;


							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();


								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.two)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);




									var myPopup = L.DomUtil.create('div', 'infoWindow');
									myPopup.innerHTML = "<div id='info'><p id='title'>" + place.name + "</p></div>";



									marker2.bindPopup(myPopup).openPopup();




									$('#info', myPopup).on('click', function() {
										goto_place2();
									});



									marker2.on("click", function (event) {
										var clickedMarker = event.layer;
										goto_place2();

									});


								});
							});
							

						}else if(user.three == 'lock'){
							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place2").style.display = 'block';
							// document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place3").style.display = 'block';
							// document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 2/5";
							// document.getElementById("btn_place3").onclick = goto_place3;

							// document.getElementById("btn_place1").onclick = checked;
							// document.getElementById("btn_place2").onclick = checked;


							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();


								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.two)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.three)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);




									var myPopup = L.DomUtil.create('div', 'infoWindow');
									myPopup.innerHTML = "<div id='info'><p id='title'>" + place.name + "</p></div>";



									marker2.bindPopup(myPopup).openPopup();




									$('#info', myPopup).on('click', function() {
										goto_place3();
									});



									marker2.on("click", function (event) {
										var clickedMarker = event.layer;
										goto_place3();

									});

								});
							});


						}else if(user.four == 'lock'){
							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place2").style.display = 'block';
							// document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place3").style.display = 'block';
							// document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place4").style.display = 'block';
							// document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 3/5";
							// document.getElementById("btn_place4").onclick = goto_place4;

							// document.getElementById("btn_place1").onclick = checked;
							// document.getElementById("btn_place2").onclick = checked;
							// document.getElementById("btn_place3").onclick = checked;


							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();


								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.two)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});

								ref2
								.orderByChild("place_id")
								.equalTo(place.three)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.four)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);




									var myPopup = L.DomUtil.create('div', 'infoWindow');
									myPopup.innerHTML = "<div id='info'><p id='title'>" + place.name + "</p></div>";



									marker2.bindPopup(myPopup).openPopup();




									$('#info', myPopup).on('click', function() {
										goto_place4();
									});



									marker2.on("click", function (event) {
										var clickedMarker = event.layer;
										goto_place4();

									});



								});
							});


						}else if(user.five == 'lock'){

							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place2").style.display = 'block';
							// document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place3").style.display = 'block';
							// document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place4").style.display = 'block';
							// document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place5").style.display = 'block';
							// document.getElementById("btn_place5").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 4/5";
							// document.getElementById("btn_place5").onclick = goto_place5;

							// document.getElementById("btn_place1").onclick = checked;
							// document.getElementById("btn_place2").onclick = checked;
							// document.getElementById("btn_place3").onclick = checked;
							// document.getElementById("btn_place4").onclick = checked;


							
							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();


								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.two)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});

								ref2
								.orderByChild("place_id")
								.equalTo(place.three)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.four)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.five)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);




									var myPopup = L.DomUtil.create('div', 'infoWindow');
									myPopup.innerHTML = "<div id='info'><p id='title'>" + place.name + "</p></div>";



									marker2.bindPopup(myPopup).openPopup();




									$('#info', myPopup).on('click', function() {
										goto_place5();
									});



									marker2.on("click", function (event) {
										var clickedMarker = event.layer;
										goto_place5();

									});

								});
							});
							

						}else{
							// document.getElementById("btn_place1").style.display = 'block';
							// document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place2").style.display = 'block';
							// document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place3").style.display = 'block';
							// document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place4").style.display = 'block';
							// document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							// document.getElementById("btn_place5").style.display = 'block';
							// document.getElementById("btn_place5").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("count_place").innerHTML = "Unlock 5/5";

							// document.getElementById("btn_place1").onclick = checked;
							// document.getElementById("btn_place2").onclick = checked;
							// document.getElementById("btn_place3").onclick = checked;
							// document.getElementById("btn_place4").onclick = checked;
							// document.getElementById("btn_place5").onclick = checked;

							var ref1 = firebase.database().ref('TreasurePlace');
							var ref2 = firebase.database().ref('Place');


							ref1
							.orderByKey()
							.equalTo('key')
							.on('child_added', function(snapshot) { 
								var place = snapshot.val();


								ref2
								.orderByChild("place_id")
								.equalTo(place.one)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.two)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});

								ref2
								.orderByChild("place_id")
								.equalTo(place.three)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});


								ref2
								.orderByChild("place_id")
								.equalTo(place.four)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker1 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
								

								ref2
								.orderByChild("place_id")
								.equalTo(place.five)
								.on('child_added', function(snapshot) { 
									var place = snapshot.val();

									var marker2 = L.marker([place.latitude, place.longtitude]).addTo(map);


								});
							});
							
							
						}
					});
});
});
});
});

}


function goto_place1(){
	window.location.href = "treasure_show_place.html?place=one";
}
function goto_place2(){
	window.location.href = "treasure_show_place.html?place=two";
}
function goto_place3(){
	window.location.href = "treasure_show_place.html?place=three";
}
function goto_place4(){
	window.location.href = "treasure_show_place.html?place=four";
}
function goto_place5(){
	window.location.href = "treasure_show_place.html?place=five";
}

function checked(){
	alert('You Checked');
}


