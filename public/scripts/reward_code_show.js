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
	document.getElementById("loading").style.display = "none";







}