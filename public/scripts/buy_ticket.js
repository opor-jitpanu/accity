    $(document).ready(function(){
      $('.count1').prop('disabled', true);
      $(document).on('click','.plus1',function(){
        $('.count1').val(parseInt($('.count1').val()) + 1 );
      });
      $(document).on('click','.minus1',function(){
        $('.count1').val(parseInt($('.count1').val()) - 1 );
        if ($('.count1').val() <= 0) {
          $('.count1').val(0);
        }
      });
    });


    $(document).ready(function(){
      $('.count2').prop('disabled', true);
      $(document).on('click','.plus2',function(){
        $('.count2').val(parseInt($('.count2').val()) + 1 );
      });
      $(document).on('click','.minus2',function(){
        $('.count2').val(parseInt($('.count2').val()) - 1 );
        if ($('.count2').val() <= 0) {
          $('.count2').val(0);
        }
      });
    });



    $(document).ready(function(){
      $('.count3').prop('disabled', true);
      $(document).on('click','.plus3',function(){
        $('.count3').val(parseInt($('.count3').val()) + 1 );
      });
      $(document).on('click','.minus3',function(){
        $('.count3').val(parseInt($('.count3').val()) - 1 );
        if ($('.count3').val() <= 0) {
          $('.count3').val(0);
        }
      });
    });





    function buyOnClick(){
      $('#myModal').modal('show');
      var ticket1 = document.getElementById('ticket1').value;
      var ticket2 = document.getElementById('ticket2').value;
      document.getElementById("show_ticket1").innerHTML = "บัตรคุ้มสยาม : " + ticket1 +"ใบ รวมเป็น : "+ticket1*350 ;
      document.getElementById("show_ticket2").innerHTML = "บัตรรายปี : " + ticket2 +"ใบ รวมเป็น : "+ticket2*500 ;
      document.getElementById("show_ticket3").innerHTML = "รวมราคาทั้งหมด : " + ((ticket2*500)+(ticket1*350)) ;


    }




    function SubmitCheckOnClick(){

      firebase.auth().onAuthStateChanged(function(user) {

        console.log(user.email);

        var email = user.email;

        var ticket1 = document.getElementById('ticket1').value;
        var ticket2 = document.getElementById('ticket2').value;

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

            var firebaseRef = firebase.database().ref("Ticket");
            var newPostRef = firebaseRef.push({
              issue:'-',
              valid:'-',
              type:'normal',
              email:email,
              date_buy:today,
              status:'stanby',
              time_in:'-',
              time_out:'-',
              date_in:'-'
            });

          }
        }


        if (ticket2 > 0) { //บัตรรายปี
          for (var i = 0; i < parseInt(ticket2); i++) {

            var firebaseRef = firebase.database().ref("Ticket");
            var newPostRef = firebaseRef.push({
              issue:'-',
              valid:'-',
              type:'year',
              email:email,
              date_buy:today,
              status:'stanby',
              time_in:'-',
              time_out:'-',
              date_in:'-'
            });

          }
        }



        alert("Complete");  

      });



      


    }

