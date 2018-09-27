window.onload = function(){
    


	var userDataRef = firebase.database().ref("Time").orderByKey();
	userDataRef.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	  var key = childSnapshot.key;
	  var childData = childSnapshot.val();              

	  var name_val = childSnapshot.val().email;
	  var time_in = childSnapshot.val().time_in;
	  var time_out = childSnapshot.val().time_out;


	  var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = name_val;
    cell2.innerHTML = time_in;
    cell3.innerHTML = time_out;




	  

	  });
	});


	
  

}



