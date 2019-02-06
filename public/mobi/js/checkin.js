function getLocation(){
  var x = document.getElementById("location");

  navigator.geolocation.getCurrentPosition(showPosition);


  function showPosition(position) {
    // var x = document.getElementById("debug_txt");
    // x.innerHTML ="Debug : " + position.coords.latitude + " , " + position.coords.longitude;
    loadwindow(position.coords.latitude, position.coords.longitude);
  }



}

var check = 0;

function refreshOnClick(){
  alert("Refresh Complete!");
  getLocation();
}


window.onload = function(){




  if (check == 0) {
    checkTimeIn();
  }else{
    reload();
    getLocation();
  }

  
  
}


function checkTimeIn(){
  firebase.auth().onAuthStateChanged(function(user) {
    GetID(user.email);
  });

  function GetID(email){
    var ref = firebase.database().ref("Time");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

      snapshot.forEach(function(data) {

        var id = data.key;

        showPoint(data.key);
      });
    });
  }


  function showPoint(id){
    var ref = firebase.database().ref("Time");
    ref.once("value")
    .then(function(snapshot){
      var time = snapshot.child(id).child("date").val();

      var today_out = new Date();
      var dd_out = today_out.getDate();
      var mm_out = today_out.getMonth()+1;
      var yyyy_out = today_out.getFullYear();

      if(dd_out<10) {
        dd_out = '0'+dd_out;
      } 

      if(mm_out<10) {
        mm_out = '0'+mm_out;
      } 

      date_out = dd_out + '/' + mm_out + '/' + yyyy_out;


      check = 1;

      if (date_out == time) {
        reload();
        getLocation();
      }else if (date_out != time){
        alert("Pleae Check Time In");
        window.location.href = "skip.html";
      }

    });
    
    
  }
}



function reload(){
  setTimeout(function(){
    getLocation();
    reload();
  }, 1000);

}


function loadwindow(c, d){





  firebase.auth().onAuthStateChanged(function(user) {

    showId(user.email);
  });

  function showId(email){
    var ref = firebase.database().ref("User");
    ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {

      snapshot.forEach(function(data) {

        var id = data.key;

        showPoint(data.key);
      });
    });

  }
  function showPoint(id){
    var ref = firebase.database().ref("User");
    ref.once("value")
    .then(function(snapshot){
      var point = snapshot.child(id).child("point").val();
      document.getElementById("point").innerHTML = "My point "+point;
    });
  }








  var a = 13.548565;
  var b = 100.628249;
  // var myLocation = [13.548565, 100.628249];
  var obj2 = {};


  var i = 1;


  var leadsRef = firebase.database().ref("Place");
  leadsRef.on('value', function(snapshot) {
    var obj3 = {};
    snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.child("name").val();
      var place_id = childSnapshot.child("place_id").val();
      var place1 = childSnapshot.child("latitude").val();
      var place2 = childSnapshot.child("longtitude").val();
      var line = 1;
      var distance = parseInt(getDistanceFromLatLonInKm(a,b,place1,place2,line));;
      obj3[place_id] = distance;
      i+=1;


    });

    var sortedCities = sortProperties(obj3);








    var x = document.getElementById("place1");
    x.innerHTML ="Distance : "+sortedCities[0][1]+" m.";
    var distance2 = parseInt(sortedCities[0][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[0][0],1, check);
    showNamePlace(sortedCities[0][0], 1);
    // var x2 = document.getElementById("btnlink1");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[0][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link1").href= "checkin_show_place.html?place="+sortedCities[0][0]+"&check="+check; 








    var x = document.getElementById("place2");
    x.innerHTML ="Distance : "+sortedCities[1][1]+" m.";
    var distance2 = parseInt(sortedCities[1][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[1][0],2, check);
    showNamePlace(sortedCities[1][0], 2);
    // var x2 = document.getElementById("btnlink2");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[1][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link2").href= "checkin_show_place.html?place="+sortedCities[1][0]+"&check="+check; 





    var x = document.getElementById("place3");
    x.innerHTML ="Distance : "+sortedCities[2][1]+" m.";
    var distance2 = parseInt(sortedCities[2][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[2][0],3, check);
    showNamePlace(sortedCities[2][0], 3);
    // var x2 = document.getElementById("btnlink3");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[2][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link3").href= "checkin_show_place.html?place="+sortedCities[2][0]+"&check="+check; 





    var x = document.getElementById("place4");
    x.innerHTML ="Distance : "+sortedCities[3][1]+" m.";
    var distance2 = parseInt(sortedCities[3][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[3][0],4, check);
    showNamePlace(sortedCities[3][0], 4);
    // var x2 = document.getElementById("btnlink4");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[3][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link4").href= "checkin_show_place.html?place="+sortedCities[3][0]+"&check="+check; 





    var x = document.getElementById("place5");
    x.innerHTML ="Distance : "+sortedCities[4][1]+" m.";
    var distance2 = parseInt(sortedCities[4][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[4][0],5, check);
    showNamePlace(sortedCities[4][0], 5);
    // var x2 = document.getElementById("btnlink5");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[4][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link5").href= "checkin_show_place.html?place="+sortedCities[4][0]+"&check="+check; 





    var x = document.getElementById("place6");
    x.innerHTML ="Distance : "+sortedCities[5][1]+" m.";
    var distance2 = parseInt(sortedCities[5][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){

      check = 'no';
    }
    showImage(sortedCities[5][0],6, check);
    showNamePlace(sortedCities[5][0], 6);
    // var x2 = document.getElementById("btnlink6");
    // x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[5][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';
    document.getElementById("link6").href= "checkin_show_place.html?place="+sortedCities[5][0]+"&check="+check; 





  });



}





function showNamePlace(place,line){

  var ref = firebase.database().ref("Place");
  ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var div_place = "name_place" + line;
      var name = data.child("name").val();
      console.log(name.length);

      document.getElementById(div_place).innerHTML = name;
    });
  });

}






function showImage(place, line, check){
  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child('images/'+place+'.jpg');
  storageRef.child('images/'+place+'.jpg').getDownloadURL().then(function(url) {
    var test = url;
    document.getElementById('image_place'+line).src = url; 

  }).catch(function(error) {

  });

  firebase.auth().onAuthStateChanged(function(user) {

    var ref2 = firebase.database().ref("Checkin");
    var ref = firebase.database().ref("Checkin");
    var check = '';
    ref.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var id = data.key;
        ref2.once("value")
        .then(function(snapshot){

          var location = snapshot.child(id).child("location").val();

          if (location == place) {
            console.log("check" + location +" "+place);
            document.getElementById('image_place'+line).style.opacity = "0.3";
          }

        });


      });

    });


  });


}






function Boo(num){
  alert(num);
}



function sortProperties(obj)
{
  // convert object into array
  var sortable=[];
  for(var key in obj)
    if(obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]); // each item is an array in format [key, value]

  // sort items by value
  sortable.sort(function(a, b)
  {
    return a[1]-b[1]; // compare numbers
  });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2,line) {

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

  return (d*1000).toFixed(0);



  // console.log(d);
  // return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}





