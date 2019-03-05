window.onload = function(){



	var url_string = window.location.href;
	var url = new URL(url_string);
	var id2 = url.searchParams.get("id");
	var check = url.searchParams.get("check");


	if (check == 'yes') {
		getImage(id2);
	}else if(check == 'no'){
		alert("This Reward is Used");
		window.location.href = "reward_history.html";
	}


	
	

	
	

}




function getImage(idd){
	
	
	var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + idd + '&amp;size=50x50';
	var test = url;
	document.getElementById("image1").src = test;
	document.getElementById("id").innerHTML = 'Code:' + idd;
	document.getElementById("loading").style.display = 'none';



}



