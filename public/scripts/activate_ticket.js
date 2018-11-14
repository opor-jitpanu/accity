window.onload = function(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var ticket = url.searchParams.get("ticket");

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

	console.log(today);

	var ref = firebase.database().ref("Ticket");
	ref.child(ticket)
	.update({ 
		status : 'activated',
		date_in : today

	});
	

	var ref = firebase.database().ref("Ticket");
    ref.once("value")
    .then(function(snapshot){
      var status = snapshot.child(ticket).child("status").val();
      var date_in = snapshot.child(ticket).child("date_in").val();
      var type = snapshot.child(ticket).child("type").val();
      

      document.getElementById("status").innerHTML = "Status : "+ status;
      document.getElementById("date").innerHTML = "Date : " + date_in;
      document.getElementById("type").innerHTML = "Type : " + type;
      document.getElementById("id").innerHTML = "ID : " + ticket;

      document.getElementById("loading").style.display = "none";
      
    });




	

}