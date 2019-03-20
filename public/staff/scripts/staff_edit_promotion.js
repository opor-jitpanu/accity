window.onload = function(){


	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var key = url.searchParams.get("key");

	var ref = firebase.database().ref("Promotion");
	ref.orderByChild('id').equalTo(key).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var id = data.key;
			var ref2 = firebase.database().ref("Place");

			ref.once("value")
			.then(function(snapshot){
				var title = snapshot.child(id).child("title").val();
				document.getElementById("title").value = title;
			});

			ref.once("value")
			.then(function(snapshot){
				var description1 = snapshot.child(id).child("description1").val();
				document.getElementById("description1").value = description1;
			});

			ref.once("value")
			.then(function(snapshot){
				var description2 = snapshot.child(id).child("description2").val();
				document.getElementById("description2").value = description2;

				var date_in = snapshot.child(id).child("date_in").val();
				var date_out = snapshot.child(id).child("date_out").val();

				var year_in = date_in.charAt(6) + date_in.charAt(7) + date_in.charAt(8) + date_in.charAt(9);
				var month_in = date_in.charAt(3) + date_in.charAt(4);
				var day_in = date_in.charAt(0) + date_in.charAt(1); 
				var date_in2 = year_in +'-'+month_in+'-'+day_in;

				var year_out = date_out.charAt(6) + date_out.charAt(7) + date_out.charAt(8) + date_out.charAt(9);
				var month_out = date_out.charAt(3) + date_out.charAt(4);
				var day_out = date_out.charAt(0) + date_out.charAt(1); 
				var date_out2 = year_out +'-'+month_out+'-'+day_out;

				console.log(date_in2);
				console.log(date_out2);
				document.getElementById("inputInDate").value = date_in2;
				document.getElementById("inpuOutDate").value = date_out2;


			});

		});
	});


}


function submitOnClick(){
	var title = document.getElementById('title').value;
	var description1 = document.getElementById('description1').value;
	var description2 = document.getElementById('description2').value;


	var date_in = document.getElementById('inputInDate').value;
	var year_in = date_in.charAt(0) + date_in.charAt(1) + date_in.charAt(2) + date_in.charAt(3);
	var month_in = date_in.charAt(5) + date_in.charAt(6);
	var day_in = date_in.charAt(8) + date_in.charAt(9); 
	var date2_in = day_in + "/" + month_in + "/" + year_in;

	

	var date_out = document.getElementById('inpuOutDate').value;
	var year_out = date_out.charAt(0) + date_out.charAt(1) + date_out.charAt(2) + date_out.charAt(3);
	var month_out = date_out.charAt(5) + date_out.charAt(6);
	var day_out = date_out.charAt(8) + date_out.charAt(9); 
	var date2_out = day_out + "/" + month_out + "/" + year_out;

	



	var url_string = window.location.href;
	var url = new URL(url_string);
	var key = url.searchParams.get("key");


	getID(key);
	
	

	


	function getID(key){

		var ref = firebase.database().ref("Promotion");
		ref.orderByChild('id').equalTo(key).on("value", function(snapshot) {
			snapshot.forEach(function(data) {

				edit(data.key);
			});
		});
	}

	function edit(id){

		firebase.database().ref("Promotion").child(id).update({
			title : title,
			description1 : description1,
			description2 : description2,
			date_in : date2_in,
			date_out : date2_out
		}, function(error) {
			if (error) {
				alert(error);
			} else {
				window.location.href = "staff_promotion.html";
			}
		});

		
		
	}
}


























