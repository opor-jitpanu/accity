window.onload = function(){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var key = url.searchParams.get("key");

	showId(key);

	function showId(key){
		var ref = firebase.database().ref("Promotion");
		ref.orderByChild('id').equalTo(key).on("value", function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        var id = data.key;
        // document.getElementById("p2").innerHTML = data.key;
        showPoint(data.key);
    });
});

	}
	function showPoint(id){
		var ref = firebase.database().ref("Promotion");
		ref.once("value")
		.then(function(snapshot){
			var title = snapshot.child(id).child("title").val();
			var des2 = snapshot.child(id).child("description2").val();
			
			getImage(title, des2);
		}); 
	}


	function getImage(title, des2){
		var storageRef = firebase.storage().ref();
		var spaceRef = storageRef.child('promotions/'+key+'.jpg');
		storageRef.child('promotions/'+key+'.jpg').getDownloadURL().then(function(url) {
			var test = url;
			show(title, des2, test);


		}).catch(function(error) {

		});
	}


	function show(title, des2, test){

		$("#image1").attr("src", test);

		document.getElementById("blog_title").innerHTML = title;
		document.getElementById("blog_des").innerHTML = des2;
		document.getElementById("loading").style.display = 'none';

	}



}