function SubmitOnClick(){


	var url_string = window.location.href;
	var url = new URL(url_string);
	var ticket = url.searchParams.get("ticket");

	var email = document.getElementById('InputEmail').value;


	var ref = firebase.database().ref("Ticket");
	ref.child(ticket)
	.update({ 
		email : email

	});
	
	alert("Complete");

	var x = document.getElementById("tranfer_ticket");
	x.style.display = "none";

	var y = document.getElementById("tranfer_ticket2");
	y.style.display = "block";

	var z = document.getElementById("form_email");
	z.style.display = "none";

	var a = document.getElementById("submit_btn");
	a.style.display = "none";

	var c = document.getElementById("back_btn");
	c.style.display = "block";

}

window.onload = function(){
	var x = document.getElementById("tranfer_ticket2");
	x.style.display = "none";
	var b = document.getElementById("back_btn");
	b.style.display = "none";
}


function BackOnClick(){
	window.location.href = "home.html";
}