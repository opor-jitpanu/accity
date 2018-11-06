function SubmitOnClick() {

  $('#myModal').modal('show')

  var email = document.getElementById('InputEmail').value;
  var ticket = document.getElementById('InputTicket').value;



  document.getElementById("email_text").innerHTML = "Email : " + email;
  document.getElementById("ticket_text").innerHTML = "Ticket : " + ticket;
}

function SubmitCheckOnClick(){

  var email = document.getElementById('InputEmail').value;
  var ticket = document.getElementById('InputTicket').value;

  
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

  for (var i = 0; i < parseInt(ticket); i++) {




    var firebaseRef = firebase.database().ref("Ticket");



    var newPostRef = firebaseRef.push({
      email:email,
      date_buy:today,
      status:'stanby',
      time_in:'-',
      time_out:'-',
      date_in:'-'
    });

    var postID = newPostRef.key;


    console.log(postID);



  }

  alert("Complete");


}




