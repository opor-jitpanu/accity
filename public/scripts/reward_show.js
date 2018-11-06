window.onload = function(){


	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	console.log(id);
	getID(id);

	

}



function getID(id){

	var ref = firebase.database().ref("Reward");
	ref.orderByChild('id').equalTo(id).on("value", function(snapshot) {

		snapshot.forEach(function(data) {

			var id = data.key;

			showInfo(id);
		});
	});
}

function showInfo(id){
	var ref = firebase.database().ref("Reward");


	ref.once("value")
	.then(function(snapshot){
		var description = snapshot.child(id).child("description").val();
		document.getElementById("description_txt").innerHTML = "Description : " + description;
	});

	



	// document.getElementById("loading").style.display = "none";


}