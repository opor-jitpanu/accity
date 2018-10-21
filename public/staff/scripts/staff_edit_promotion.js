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
			});

		});
	});


}


function submitOnClick(){
	var title = document.getElementById('title').value;
	var description1 = document.getElementById('description1').value;
	var description2 = document.getElementById('description2').value;



	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var key = url.searchParams.get("key");


	getID(key);
	
	

	


	function getID(key){

		var ref = firebase.database().ref("Promotion");
		ref.orderByChild('id').equalTo(key).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
        // alert(data.key);
        edit(data.key);
    });
		});
	}

	function edit(id){
		var ref = firebase.database().ref("Promotion");
		ref.child(id)
		.update({ title : title,
			description1 : description1,
			description2 : description2
		});
		alert("Complete");
		window.location.href = "staff_promotion.html";
	}
}


























