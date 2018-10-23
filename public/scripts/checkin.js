function getLocation(){
  var x = document.getElementById("location");

  navigator.geolocation.getCurrentPosition(showPosition);


  function showPosition(position) {
    var x = document.getElementById("debug_txt");
    x.innerHTML ="Debug : " + position.coords.latitude + " , " + position.coords.longitude;
    loadwindow(position.coords.latitude, position.coords.longitude);
  }



}



function refreshOnClick(){
  alert("Refresh Complete!");
  getLocation();
}


window.onload = function(){


  reload();
  getLocation();
}



function reload(){
  setTimeout(function(){
    getLocation();
    reload();
  }, 1000);

}


function loadwindow(c, d){




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
    showImage(sortedCities[0][0],1);
    showNamePlace(sortedCities[0][0], 1);
    var x2 = document.getElementById("btnlink1");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[0][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';


    var x = document.getElementById("place2");
    x.innerHTML ="Distance : "+sortedCities[1][1]+" m.";
    var distance2 = parseInt(sortedCities[1][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[1][0],2);
    showNamePlace(sortedCities[1][0], 2);
    var x2 = document.getElementById("btnlink2");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[1][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

    var x = document.getElementById("place3");
    x.innerHTML ="Distance : "+sortedCities[2][1]+" m.";
    var distance2 = parseInt(sortedCities[2][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[2][0],3);
    showNamePlace(sortedCities[2][0], 3);
    var x2 = document.getElementById("btnlink3");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[2][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

    var x = document.getElementById("place4");
    x.innerHTML ="Distance : "+sortedCities[3][1]+" m.";
    var distance2 = parseInt(sortedCities[3][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[3][0],4);
    showNamePlace(sortedCities[3][0], 4);
    var x2 = document.getElementById("btnlink4");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[3][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

    var x = document.getElementById("place5");
    x.innerHTML ="Distance : "+sortedCities[4][1]+" m.";
    var distance2 = parseInt(sortedCities[4][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){
      check = 'no';
    }
    showImage(sortedCities[4][0],5);
    showNamePlace(sortedCities[4][0], 5);
    var x2 = document.getElementById("btnlink5");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[4][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

    var x = document.getElementById("place6");
    x.innerHTML ="Distance : "+sortedCities[5][1]+" m.";
    var distance2 = parseInt(sortedCities[5][1]);
    var check  = '';
    if (distance2 < 300) {
      check = 'yes';
    }else if(distance2 >= 301){

      check = 'no';
    }
    showImage(sortedCities[5][0],6);
    showNamePlace(sortedCities[5][0], 6);
    var x2 = document.getElementById("btnlink6");
    x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[5][0]+'&'+'check='+check+'"><button class="btn btn-primary">More Information</button></a><center>';

  });

  document.getElementById("loading1").style.display = "none";

}



function showNamePlace(place,line){



  var ref = firebase.database().ref("Place");
  ref.orderByChild('place_id').equalTo(place).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var div_place = "name_place" + line;
      document.getElementById(div_place).innerHTML = data.child("name").val();
    });
  });

}


function showImage(place, line){
  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child('images/'+place+'.jpg');
  storageRef.child('images/'+place+'.jpg').getDownloadURL().then(function(url) {
    var test = url;
    document.getElementById('image'+line).src = url;


  }).catch(function(error) {

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





