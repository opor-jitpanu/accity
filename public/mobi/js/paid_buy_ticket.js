window.onload = function(){
	
	// var url_string = window.location.href;
	// var url = new URL(url_string);
	// var t1 = url.searchParams.get("t1");
	// var t2 = url.searchParams.get("t2");


    var t1 = sessionStorage.getItem("submit_ticket_day");
    var t2 = sessionStorage.getItem("submit_ticket_year");


    if (t1) {
        if (t2) {

        }else{
            sessionStorage.clear();
            window.location.href = "my_ticket.html";
        }
    }else{

        sessionStorage.clear();
        window.location.href = "my_ticket.html";

    }


    firebase.auth().onAuthStateChanged(function(user) {




      console.log(user.email);

      var email = user.email;

      var ticket1 = t1;
      var ticket2 = t2;

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

        if (ticket1 > 0) { //บัตรคุ้มสยาม
        	for (var i = 0; i < parseInt(ticket1); i++) {

        		// var firebaseRef = firebase.database().ref("Ticket");
        		// var newPostRef = firebaseRef.push({
        		// 	issue:'-',
        		// 	valid:'-',
        		// 	type:'normal',
        		// 	email:email,
        		// 	date_buy:today,
        		// 	status:'stanby',
        		// 	time_in:'-',
        		// 	time_out:'-',
        		// 	date_in:'-',
        		// 	name:'-'
        		// });




                firebase.database().ref("Ticket").push({
                    issue:'-',
                    valid:'-',
                    type:'normal',
                    email:email,
                    date_buy:today,
                    status:'stanby',
                    time_in:'-',
                    time_out:'-',
                    date_in:'-',
                    name:'-'
                }, function(error) {
                    if (error) {
                        alert(error);
                    } else {
                        sessionStorage.clear();
                        window.location.href = "my_ticket.html";
                    }
                });








            }
        }


        if (ticket2 > 0) { //บัตรรายปี
        	for (var i = 0; i < parseInt(ticket2); i++) {

        		// var firebaseRef = firebase.database().ref("Ticket");
        		// var newPostRef = firebaseRef.push({
        		// 	issue:'-',
        		// 	valid:'-',
        		// 	type:'year',
        		// 	email:email,
        		// 	date_buy:today,
        		// 	status:'stanby',
        		// 	time_in:'-',
        		// 	time_out:'-',
        		// 	date_in:'-',
        		// 	name:'-'
        		// });





                firebase.database().ref("Ticket").push({
                    issue:'-',
                    valid:'-',
                    type:'year',
                    email:email,
                    date_buy:today,
                    status:'stanby',
                    time_in:'-',
                    time_out:'-',
                    date_in:'-',
                    name:'-'
                }, function(error) {
                    if (error) {
                        alert(error);
                    } else {
                        sessionStorage.clear();
                        window.location.href = "my_ticket.html";
                    }
                });




                

            }
        }



        // alert("Complete"); 
        
        
        // var timer1 =setTimeout(function() { window.location.href = "my_ticket.html"; }, 3000);




    });


}