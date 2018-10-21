window.onload = function(){




	var leadsRef = firebase.database().ref("Promotion");
	var storageRef = firebase.storage().ref();
	leadsRef.on('value', function(snapshot) {
		var obj3 = {};
		var line = 1;
		snapshot.forEach(function(childSnapshot) {
			var id = childSnapshot.child("id").val();
			var title = childSnapshot.child("title").val();
			var des1 = childSnapshot.child("description1").val();
			console.log(id);
			var spaceRef = storageRef.child('promotions/'+id+'.jpg');

			storageRef.child('promotions/'+id+'.jpg').getDownloadURL().then(function(url) {
				console.log(line);
				var test = url;
				var a = '<div class="card" style="width: 20rem;"><a href="promotion_1.html"><img class="card-img-top" src="'+ test +'" alt="Card image cap"></a><div class="card-body"><p>'+title+'</p><p class="card-text">'+des1+'</p></div></div><br>';
				document.getElementById("promotion" + line).innerHTML = a;
				line = line + 1;
				


			}).catch(function(error) {

			});

		});
		
	});

	



	
}