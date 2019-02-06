
window.onload = function(){






	var obj = {};
	var userDataRef = firebase.database().ref("Checkin");

	userDataRef.once("value").then(function(snapshot) {

		var place_id = [];
		snapshot.forEach(function(childSnapshot) {



			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var location = childSnapshot.val().location;





			if (place_id.includes(location)) {
				// obj[place_id] = distance;
				
			}else{
				
				place_id.push(location);
				obj[location] = 1;
			}





		});


		console.log(obj);

		// console.log(place_id);
		// console.log(place_id.length);





		// var obj3 = {};
		// var a1 = [];
		// var a2 = [];
		


		// var a = 1;
		// for (var i = 1; i < place_id.length; i++) {



			
			
		// 	userDataRef.orderByChild("location").equalTo(place_id[a]).once("value").then(function(snapshot) {


		// 		var count = 0;
		// 		snapshot.forEach(function(childSnapshot) {

		// 			count +=1;

		// 		});


		// 		console.log(a);
		// 		console.log(i);
		// 		console.log(place_id[a] + " : " + count);
				


		// 	});
		// 	a += 1;


		// }







	});



}







































