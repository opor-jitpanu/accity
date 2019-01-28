window.onload = function(){
  document.getElementById("loading").style.display = "none";


}


function saveNameOnClick(){

  

  var url_string = window.location.href;
  var url = new URL(url_string);
  var ticket = url.searchParams.get("ticket");


  var firstname = document.getElementById('InputFirstname').value;
  var lastname = document.getElementById('InputLastname').value;



  if (firstname == "" || lastname == "") {
    alert("Please check you name");
  }else{
    document.getElementById("loading").style.display = "block";
    var name = capitalizeFirstLetter(firstname)+' '+capitalizeFirstLetter(lastname);

    var ref = firebase.database().ref("Ticket");
    ref.child(ticket)
    .update({ 
      name : name

    });



    var timer2 =setTimeout(function() { 
      window.location.href = "my_ticket.html";
    }, 4000);


  }

  




}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}