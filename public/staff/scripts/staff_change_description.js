function changeNameOnClick() {
	var text = document.getElementById('descriptionPlace').value;
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var place = url.searchParams.get("place");

	getID(place);


	function getID(place){

      var ref = firebase.database().ref("Place");
      ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        // alert(data.key);
          edit(data.key);
        });
    });
    }

    function edit(id){
      var ref = firebase.database().ref("Place");
      ref.child(id)
      .update({ description : text
     });

        window.location.href = "staff_change_place.html";
    }



	
}