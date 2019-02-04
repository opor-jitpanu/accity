window.onload = function(){
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var t1 = url.searchParams.get("t1");
	var t2 = url.searchParams.get("t2");
	var sum = url.searchParams.get("sum");

	document.getElementById("ticket").innerHTML = "Normal Ticket : " + t1;
	document.getElementById("ticket2").innerHTML = "Year Ticket : " + t2;
	document.getElementById("sum").innerHTML = "Sum : " + sum + " Baht";

}