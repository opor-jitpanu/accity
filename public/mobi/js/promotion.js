window.onload = function(){

	
	var mydiv = document.getElementById('list');
	


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














			var spaceRef = storageRef.child('promotions/'+id+'.jpg');

			storageRef.child('promotions/'+id+'.jpg').getDownloadURL().then(function(url) {
				
				var test = url;
				if (check >= from && check <= to) {
					
					var a = '<div class="card" style="width: 20rem;"><a href="promotion_show.html?key='+id+'"><img class="card-img-top" src="'+ test +'" alt="Card image cap"></a><div class="card-body"><p>'+title+'</p><p class="card-text">'+des1+'</p></div></div><br>';
					
					


					var div = '<a href="promotion_show.html?key='+id+'"><li><div class="swiper-wrapper"><div class="swiper-slide swipeout-content item-content"><div class="post_entry"><div class="post_thumb"><img src="'+test+'" alt="" title="" /></div><div class="post_details"><div class="post_category">'+title+'</div><h2>'+des1+'</h2></div></div></div></div></li></a>';
					
					mydiv.innerHTML += div;
				}


				document.getElementById("loading").style.display = 'none';


			}).catch(function(error) {

			});

		});

	});

	



	
}