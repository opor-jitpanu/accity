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