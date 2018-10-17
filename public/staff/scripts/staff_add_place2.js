function AddPlaceOnClick() {
	var id = document.getElementById('idPlace').value;
	var name = document.getElementById('namePlace').value;
	var description = document.getElementById('descriptionPlace').value;
	var point = document.getElementById('pointPlace').value;
	insertData(id, name, description, point);
}


function insertData(id, name, description, point){
	var firebaseRef = firebase.database().ref("Place");
	firebaseRef.push({
		place_id:id,
		name:name,
		point:point,
		description:description
	});
	myFunction2();
}


function myFunction2() {
    myVar = setTimeout(nextpage(), 4000);
  }



  function nextpage() {
  	alert("complete");
    // window.location= "staff_change_place.html";
  }