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







    function ticket1minusOnClick(){
      var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket > 0) {
        ticket = parseInt(ticket);
        ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
      }

    }


    function ticket1plusOnClick(){

      var ticket = document.getElementById('ticket1').value;
      // console.log(ticket);
      if (ticket >= 0) {
        ticket = parseInt(ticket);
        ticket += 1;
        // console.log("tet");

        document.getElementById("ticket1").value = ticket;
      }

    }



    function ticket2minusOnClick(){
      var ticket = document.getElementById('ticket2').value;
      // console.log(ticket);
      if (ticket > 0) {
        ticket = parseInt(ticket);
        ticket -= 1;
        // console.log("tet");

        document.getElementById("ticket2").value = ticket;
      }

    }


    function ticket2plusOnClick(){

      var ticket = document.getElementById('ticket2').value;
      // console.log(ticket);
      if (ticket >= 0) {
        ticket = parseInt(ticket);
        ticket += 1;
        // console.log("tet");

        document.getElementById("ticket2").value = ticket;
      }

    }

















    function buyOnClick(){
      $('#myModal').modal('show');
      var ticket1 = document.getElementById('ticket1').value;
      var ticket2 = document.getElementById('ticket2').value;
      // document.getElementById("show_ticket1").innerHTML = "บัตรคุ้มสยาม : " + ticket1 +"ใบ รวมเป็น : "+ticket1*350 ;
      // document.getElementById("show_ticket2").innerHTML = "บัตรรายปี : " + ticket2 +"ใบ รวมเป็น : "+ticket2*500 ;
      // document.getElementById("show_ticket3").innerHTML = "รวมราคาทั้งหมด : " + ((ticket2*500)+(ticket1*350)) ;


      var table = document.getElementById("myTable");
      var row = table.insertRow(0);

      var cell_place_id = row.insertCell(0);
      cell_place_id.innerHTML = "Total";

      var cell_place_name = row.insertCell(1);
      cell_place_name.innerHTML = parseInt(ticket1)+parseInt(ticket2);

      var cell_place_name = row.insertCell(2);
      cell_place_name.innerHTML = ticket1 * 350 +" + "+ticket2 * 500 +" = "+ (parseInt(ticket2 * 500)+parseInt(ticket1*350));
      document.getElementById("total_all").innerHTML = ""+(parseInt(ticket2 * 500)+parseInt(ticket1*350));


      if (ticket1 > 0) {

        var table = document.getElementById("myTable");
        var row = table.insertRow(0);

        var cell_place_id = row.insertCell(0);
        cell_place_id.innerHTML = "Normal Ticket";

        var cell_place_name = row.insertCell(1);
        cell_place_name.innerHTML = ticket1;

        var cell_place_name = row.insertCell(2);
        cell_place_name.innerHTML = ticket1+"x 350 = "+ticket1 * 350;
        
      }

      if (ticket2 > 0) {

        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        
        var cell_place_id = row.insertCell(0);
        cell_place_id.innerHTML = "Year Ticket";

        var cell_place_name = row.insertCell(1);
        cell_place_name.innerHTML = ticket2;

        var cell_place_name = row.insertCell(2);
        cell_place_name.innerHTML = ticket2+"x 500 = "+ticket2 * 500;
        
      }
      last();

    }

    function last(){





      var table = document.getElementById("myTable");
      var header = table.createTHead();
      var row = header.insertRow(0);
      var cell = row.insertCell(0);
      cell.innerHTML = "<center><b>Type</b></center>";
      var cell = row.insertCell(1);
      cell.innerHTML = "<center><b>Count</b></center>";
      var cell = row.insertCell(2);
      cell.innerHTML = "<center><b>Price</b></center>";
    }


    function SubmitCheckOnClick(){

      var ticket1 = document.getElementById('ticket1').value;
      var ticket2 = document.getElementById('ticket2').value;
      window.location.href = 'submit_buy_ticket.html?t1='+ticket1+'&t2='+ticket2+'&sum='+(parseInt(ticket2 * 500)+parseInt(ticket1*350));
      // firebase.auth().onAuthStateChanged(function(user) {

      //   console.log(user.email);

      //   var email = user.email;

      //   var ticket1 = document.getElementById('ticket1').value;
      //   var ticket2 = document.getElementById('ticket2').value;

      //   var today = new Date();
      //   var dd = today.getDate();
      //   var mm = today.getMonth()+1;
      //   var yyyy = today.getFullYear();

      //   if(dd<10) {
      //     dd = '0'+dd
      //   } 

      //   if(mm<10) {
      //     mm = '0'+mm
      //   } 

      //   today = dd + '/' + mm + '/' + yyyy;

      //   if (ticket1 > 0) { //บัตรคุ้มสยาม
      //     for (var i = 0; i < parseInt(ticket1); i++) {

      //       var firebaseRef = firebase.database().ref("Ticket");
      //       var newPostRef = firebaseRef.push({
      //         issue:'-',
      //         valid:'-',
      //         type:'normal',
      //         email:email,
      //         date_buy:today,
      //         status:'stanby',
      //         time_in:'-',
      //         time_out:'-',
      //         date_in:'-',
      //         name:'-'
      //       });

      //     }
      //   }


      //   if (ticket2 > 0) { //บัตรรายปี
      //     for (var i = 0; i < parseInt(ticket2); i++) {

      //       var firebaseRef = firebase.database().ref("Ticket");
      //       var newPostRef = firebaseRef.push({
      //         issue:'-',
      //         valid:'-',
      //         type:'year',
      //         email:email,
      //         date_buy:today,
      //         status:'stanby',
      //         time_in:'-',
      //         time_out:'-',
      //         date_in:'-',
      //         name:'-'
      //       });

      //     }
      //   }



      //   alert("Complete"); 
      //   $('#myModal').modal('hide');
      //   document.getElementById("loading").style.display = "block";
      //   var timer1 =setTimeout(function() { window.location.href = "my_ticket.html"; }, 3000);




      // });

    }






    window.onload = function(){
      // // document.getElementById("loading").style.display = "none";
      // var timer2 =setTimeout(function() { 
      //   document.getElementById("loading").style.display = "none"; 
      // }, 1000);
    }





    function CloseOnClick(){

      var Table = document.getElementById("myTable");
      Table.innerHTML = "";

    }








