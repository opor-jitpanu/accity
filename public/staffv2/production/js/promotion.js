window.onload = function(){


	if (sessionStorage.getItem("login") == 'yes') {
		showData();
	}else{
		window.location.href = "login.html";
	}
}



function showData(){

	
	var ref = firebase.database().ref("Promotion");

	var t = $('#datatablePromotion').DataTable();


	var ref = firebase.database().ref('Promotion');
	ref
	.on('child_added', function(snapshot) { 
		var promotion = snapshot.val();


		var storageRef = firebase.storage().ref();
		var spaceRef = storageRef.child('promotions/'+promotion.id+'.jpg');
		storageRef.child('promotions/'+promotion.id+'.jpg').getDownloadURL().then(function(url) {
			var test = url;


			t.row.add( [

				'<a href="promotion_image.html?key='+promotion.id+'" ><img id="image1" src="'+url+'" width="100%"></a>',
				'<a href="promotion_edit.html?place='+promotion.id+'" >'+promotion.title+'</a>',

				promotion.description1,

				promotion.date_in +" - "+ promotion.date_out,
				
				'<a href="promotion_delete.html?key='+promotion.id+'" ><button class="btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></a>'
				
				] ).draw( false );



		}).catch(function(error) {

		});
		

		
	});
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


