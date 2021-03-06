window.onload = function(){

  if (sessionStorage.getItem("login") == 'yes') {
   var url_string = window.location.href; 
   var url = new URL(url_string);
   var email = url.searchParams.get("email");
   getId(email);
 }else{
  window.location.href = "login.html";
}



}

function getId(email){
  var ref = firebase.database().ref("User");
  ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var id = data.key;
      showInfo(data.key,email);
    });
  });
}

function showInfo(id,email){
	var ref = firebase.database().ref("User");
 ref.once("value")
 .then(function(snapshot){

  document.getElementById("firstnamelastname").innerHTML = snapshot.child(id).child("firstname").val() +"  "+ snapshot.child(id).child("lastname").val();
  document.getElementById("email_txt").innerHTML = "อีเมล : " + snapshot.child(id).child("email").val();
  // document.getElementById("password_txt").innerHTML = "รหัสผ่าน : " + snapshot.child(id).child("password").val();
  document.getElementById("birth_txt").innerHTML = "วันเดือนปีเกิด : " + snapshot.child(id).child("birth").val();
  document.getElementById("gender_txt").innerHTML = "เพศ : " + snapshot.child(id).child("sex").val();
  document.getElementById("telephone_txt").innerHTML = "เบอร์โทรศัพท์ : " + snapshot.child(id).child("tel").val();
  document.getElementById("country_txt").innerHTML = "ประเทศ : " + snapshot.child(id).child("country").val();
  document.getElementById("point_txt").innerHTML = "คะแนน : " + snapshot.child(id).child("point").val();


  document.getElementById('telephone_txt').style.display = "none";
  document.getElementById('popup_pass').style.display = "none";



});
 showCheckin(email);
 showTicket(email);
 showReward(email);
 showTimeIn(email);

}


function showCheckin(email){



  var userDataRef = firebase.database().ref("Checkin").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              

      var location = childSnapshot.val().location;
      var check_in = childSnapshot.val().time_checkin;
      var date = childSnapshot.val().date;

      



      if (date != '-') {

        var ref = firebase.database().ref("Place").orderByChild("place_id").equalTo(location);
        ref.on('child_added', function(snapshot) { 
          var user = snapshot.val();

          $.fn.dataTable.ext.errMode = 'none';

          var t = $('#datatableCheckin').DataTable();

          t.row.add( [
            user.name,
            date,
            check_in
            ] ).draw();


        });

      }

    });

  });


  
}




function deleteTicket(objButton){


  var ref3 = firebase.database().ref("Ticket");
  ref3.orderByKey().equalTo(objButton.value).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      ref3.child(data.key).remove()
      .then(function() {
        console.log("Remove succeeded.")



        var url_string = window.location.href; 
        var url = new URL(url_string);
        var email = url.searchParams.get("email");
        window.location= "showdata_profile.html?email="+email;



      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });

    });

  });


}




function showTicket(email){


  var userDataRef = firebase.database().ref("Ticket").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              

      var t = $('#datatableTicket').DataTable();

      t.row.add( [
        key,
        childData.date_buy,
        childData.date_in,
        childData.issue,
        childData.type,
        '<button class="btn btn-primary btn-xs" onclick="deleteTicket(this)" value='+'"'+key+'"'+'><i class="fa fa-trash"></i> Delete </button>'
        ] ).draw();


    });

    
  });

}


function showReward(email){


  var userDataRef = firebase.database().ref("Code").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              
      
      
      var ref = firebase.database().ref("Reward").orderByKey().equalTo(childData.id);
      ref.on('child_added', function(snapshot) { 
        var user = snapshot.val();

        var t = $('#datatableReward').DataTable();

        


        if (childData.status == 'used') {

          t.row.add( [
            childData.date,
            childData.time,
            'แลกสำเร็จ',
            user.name
            ] ).draw();

        }else{
          t.row.add( [
            childData.date,
            childData.time,
            childData.status,
            user.name
            ] ).draw();
        }

        


      });

    });

    
  });

}





















function showTimeIn(email){


  var userDataRef = firebase.database().ref("TimeIn").orderByChild("email").equalTo(email);
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              

      var t = $('#datatableTimeIn').DataTable();

      t.row.add( [

        childData.date,
        childData.time
        ] ).draw();


    });

    
  });

}










function showInfoAdvance(){

  document.getElementById('popup_pass').style.display = "block";

}



function showInfoAdvanceSubmit(){



  var pass = document.getElementById('pass').value;


  if(pass == "0000"){
    document.getElementById('telephone_txt').style.display = "block";
    document.getElementById('popup_pass').style.display = "none";
  }else{
    alert("รหัสผ่านไม่ถูกต้อง");
  }

  
}












function deleteAccount(){


  var url_string = window.location.href; 
  var url = new URL(url_string);
  var email = url.searchParams.get("email");













  var ref4 = firebase.database().ref("Treasure");
  ref4.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      ref4.child(data.key).remove()
      .then(function() {



        var ref = firebase.database().ref("User");
        ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
          snapshot.forEach(function(data) {
            ref.child(data.key).remove()
            .then(function() {



              var ref2 = firebase.database().ref("Time");
              ref2.orderByChild('email').equalTo(email).on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                  ref2.child(data.key).remove()
                  .then(function() {




                    var ref3 = firebase.database().ref("Checkin");
                    ref3.orderByChild('email').equalTo(email).on("value", function(snapshot) {
                      snapshot.forEach(function(data) {
                        ref3.child(data.key).remove()
                        .then(function() {
                          console.log("Remove succeeded.")
                          window.location= "search.html";



                        })
                        .catch(function(error) {
                          console.log("Remove failed: " + error.message)
                        });

                      });

                    });



                  })
                  .catch(function(error) {
                    console.log("Remove failed: " + error.message)
                  });

                });

              });




            })
            .catch(function(error) {
              console.log("Remove failed: " + error.message)
            });



          });

        });




      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
      
      
    });

  });







}