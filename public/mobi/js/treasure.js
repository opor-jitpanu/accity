window.onload = function(){


	

	document.getElementById("btn_place1").style.display = 'none';
	document.getElementById("btn_place2").style.display = 'none';
	document.getElementById("btn_place3").style.display = 'none';
	document.getElementById("btn_place4").style.display = 'none';
	document.getElementById("btn_place5").style.display = 'none';

	

	firebase.auth().onAuthStateChanged(function(user) {


		var ref = firebase.database().ref("User");
		ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				var id = data.key;

				ref.once("value")
				.then(function(snapshot){

					var email = snapshot.child(id).child("email").val();

					var ref2 = firebase.database().ref('Treasure');
					ref2
					.orderByChild('email')
					.equalTo(email)
					.on('child_added', function(snapshot) { 
						var user = snapshot.val();

						if (user.one == 'lock') {

							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)"; //grey
							document.getElementById("count_place").innerHTML = "Unlock 0/5";
							document.getElementById("btn_place1").onclick = goto_place1;
								

						}else if(user.two == 'lock'){

							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)"; //pink
							document.getElementById("btn_place2").style.display = 'block';
							document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 1/5";
							document.getElementById("btn_place2").onclick = goto_place2;

							document.getElementById("btn_place1").onclick = checked;
							

						}else if(user.three == 'lock'){
							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place2").style.display = 'block';
							document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place3").style.display = 'block';
							document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 2/5";
							document.getElementById("btn_place3").onclick = goto_place3;

							document.getElementById("btn_place1").onclick = checked;
							document.getElementById("btn_place2").onclick = checked;


						}else if(user.four == 'lock'){
							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place2").style.display = 'block';
							document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place3").style.display = 'block';
							document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place4").style.display = 'block';
							document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 3/5";
							document.getElementById("btn_place4").onclick = goto_place4;

							document.getElementById("btn_place1").onclick = checked;
							document.getElementById("btn_place2").onclick = checked;
							document.getElementById("btn_place3").onclick = checked;


						}else if(user.five == 'lock'){

							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place2").style.display = 'block';
							document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place3").style.display = 'block';
							document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place4").style.display = 'block';
							document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place5").style.display = 'block';
							document.getElementById("btn_place5").style.background = "linear-gradient(60deg, #9E9E9E, #607D8B)";
							document.getElementById("count_place").innerHTML = "Unlock 4/5";
							document.getElementById("btn_place5").onclick = goto_place5;

							document.getElementById("btn_place1").onclick = checked;
							document.getElementById("btn_place2").onclick = checked;
							document.getElementById("btn_place3").onclick = checked;
							document.getElementById("btn_place4").onclick = checked;
							

						}else{
							document.getElementById("btn_place1").style.display = 'block';
							document.getElementById("btn_place1").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place2").style.display = 'block';
							document.getElementById("btn_place2").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place3").style.display = 'block';
							document.getElementById("btn_place3").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place4").style.display = 'block';
							document.getElementById("btn_place4").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("btn_place5").style.display = 'block';
							document.getElementById("btn_place5").style.background = "linear-gradient(60deg, #E91E63, #FFC107)";
							document.getElementById("count_place").innerHTML = "Unlock 5/5";

							document.getElementById("btn_place1").onclick = checked;
							document.getElementById("btn_place2").onclick = checked;
							document.getElementById("btn_place3").onclick = checked;
							document.getElementById("btn_place4").onclick = checked;
							document.getElementById("btn_place5").onclick = checked;
							
						}
					});
				});
			});
		});
	});

}


function goto_place1(){
	window.location.href = "treasure_show_place.html?place=one";
}
function goto_place2(){
	window.location.href = "treasure_show_place.html?place=two";
}
function goto_place3(){
	window.location.href = "treasure_show_place.html?place=three";
}
function goto_place4(){
	window.location.href = "treasure_show_place.html?place=four";
}
function goto_place5(){
	window.location.href = "treasure_show_place.html?place=five";
}

function checked(){
	alert('You Checked');
}


