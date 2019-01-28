function AddPlaceOnClick() {
	var title = document.getElementById('titlePromotion').value;
	var des1 = document.getElementById('descriptionPromotion1').value;
	var des2 = document.getElementById('descriptionPromotion2').value;
	var d = new Date();
	var key = d.getTime();
	console.log(key);
	


	var file = document.getElementById('uploadImage').files[0];
	var storageRef = firebase.storage().ref();


	var isValid = /\.jpe?g$/i.test(file.name);
	if (!isValid) {
		alert('Only jpg files allowed!');
	}else{
		var uploadTask = storageRef.child('promotions/' + key + ".jpg").put(file);
		insertData(title, des1, des2, key);
		
	}


}


function insertData(title, des1, des2, key){
	var key2 = key.toString();
	var firebaseRef = firebase.database().ref("Promotion");
	firebaseRef.push({
		title:title,
		description1:des1,
		description2:des2,
		id:key2
	});
	alert('Complete');
	myFunction2();
}

function myFunction2() {
	myVar = setTimeout(nextpage(), 4000);
}

function nextpage() {
	alert("complete");
    window.location= "staff_promotion.html";
}