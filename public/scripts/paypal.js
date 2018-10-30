var firstname = document.getElementById('InputFirstname').value;
    var lastname = document.getElementById('InputLastname').value;
    var email = document.getElementById('InputEmail').value;
    var idcard = document.getElementById('InputId').value;

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

    var d = new Date();
    var key = d.getTime();

    var firebaseRef = firebase.database().ref("Buy");
    firebaseRef.push({
      firstname:firstname,
      lastname:lastname,
      email:email,
      idcard:idcard,
      status:'stanby',
      date:today,
      code:key
    });