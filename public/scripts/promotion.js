window.onload = function(){


	// var dateFrom = "02/05/2013";
	// var dateTo = "02/09/2013";
	// var dateCheck = "02/07/2013";

	// var d1 = dateFrom.split("/");
	// var d2 = dateTo.split("/");
	// var c = dateCheck.split("/");

	


	var leadsRef = firebase.database().ref("Promotion");
	var storageRef = firebase.storage().ref();
	leadsRef.on('value', function(snapshot) {
		var obj3 = {};
		var line = 1;
		snapshot.forEach(function(childSnapshot) {
			var id = childSnapshot.child("id").val();
			var title = childSnapshot.child("title").val();
			var des1 = childSnapshot.child("description1").val();

			var dateFrom = childSnapshot.child("date_in").val();
			var dateTo = childSnapshot.child("date_out").val();
			var d1 = dateFrom.split("/");
			var d2 = dateTo.split("/");
			var today_out = new Date();
			var dd_out = today_out.getDate();
			var mm_out = today_out.getMonth()+1;
			var yyyy_out = today_out.getFullYear();

			if(dd_out<10) {
				dd_out = '0'+dd_out;
			} 

			if(mm_out<10) {
				mm_out = '0'+mm_out;
			} 

			var dateCheck = dd_out + '/' + mm_out + '/' + yyyy_out;
			var c = dateCheck.split("/");

			var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
			var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
			var check = new Date(c[2], parseInt(c[1])-1, c[0]);

			// console.log(check > from && check < to)


			var spaceRef = storageRef.child('promotions/'+id+'.jpg');

			storageRef.child('promotions/'+id+'.jpg').getDownloadURL().then(function(url) {
				console.log(line);
				var test = url;
				if (check >= from && check <= to) {
					var a = '<div class="card" style="width: 20rem;"><a href="promotion_show.html?key='+id+'"><img class="card-img-top" src="'+ test +'" alt="Card image cap"></a><div class="card-body"><p>'+title+'</p><p class="card-text">'+des1+'</p></div></div><br>';
					document.getElementById("promotion" + line).innerHTML = a;
					line = line + 1;
				}
				
				
				


			}).catch(function(error) {

			});
			document.getElementById("loading").style.display = "none";

		});
		
	});

	



	
}