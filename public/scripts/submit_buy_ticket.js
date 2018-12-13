window.onload = function(){
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var t1 = url.searchParams.get("t1");
	var t2 = url.searchParams.get("t2");
}