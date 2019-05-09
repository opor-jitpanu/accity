window.onload = function(){



	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;
	showData(today);



}


function showData(day){



	var userDataRef = firebase.database().ref("Time").orderByChild("date").equalTo(day);
	var ref = firebase.database().ref("User");
	var t = $('#datatable').DataTable();

	userDataRef.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var childData = childSnapshot.val();

			var date = childSnapshot.val().date;
			var name_val = childSnapshot.val().email;
			var time_in = childSnapshot.val().time_in;
			var time_out = childSnapshot.val().time_out;

			var table = document.getElementById("datatable");
			var row = table.insertRow(0);



			ref.orderByChild('email').equalTo(name_val).on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					var id = data.key;
					

					ref.once("value")
					.then(function(snapshot){
						var firstname = capitalizeFirstLetter(snapshot.child(id).child("firstname").val());
						var lastname = capitalizeFirstLetter(snapshot.child(id).child("lastname").val());
						var tel = snapshot.child(id).child("tel").val();
						var email = snapshot.child(id).child("email").val();

						






						t.row.add( [
							firstname + " " + lastname,
							date
							] ).draw( false );

						
					});
				});




			});
		});
		
	});

}





function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}