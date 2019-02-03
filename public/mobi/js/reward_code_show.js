function BackOnClick(){
	window.location.href = "reward.html";
}


window.onload = function(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var key = url.searchParams.get("key");
	var point = url.searchParams.get("point");
	document.getElementById("code").innerHTML = "Your Code : " + key;
	document.getElementById("point").innerHTML = "Your current point : " + point;


	var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + key + '&amp;size=50x50';
	$('#barcode').attr('src', url);




}