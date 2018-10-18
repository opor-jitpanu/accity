function getLocation(){
    var x = document.getElementById("location");
    
        navigator.geolocation.getCurrentPosition(showPosition);


        function showPosition(position) {
            // x.innerHTML = "Latitude: " + position.coords.latitude + 
            // "<br>Longitude: " + position.coords.longitude;
            // console.log(position.coords.latitude);
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
      // alert("opor");
      getLocation();
      reload();
}, 1000);

  }


function loadwindow(a, b){
  
  var myLocation = [a, b];
  // var myLocation = [13.967334, 100.681166];

  var place_10 = [13.543415, 100.625869];
  var place_27 = [13.545837, 100.628526];
  var place_30 = [13.546812, 100.628444];
  var place_45 = [13.548222, 100.630409];
  var place_46 = [13.549476, 100.631014];
  var place_55 = [13.551084, 100.631288];
  var place_58 = [13.552197, 100.632127];
  var place_66 = [13.548838, 100.634357];
  var place_106 = [13.552046,  100.627418];
  var place_110 = [13.549120,  100.625553];

  var obj = {};

  
  obj.p10 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_10[0], place_10[1],10));;
  obj.p27 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_27[0], place_27[1],27));;
  obj.p30 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_30[0], place_30[1],30));;
  obj.p45 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_45[0], place_45[1],45));; 
  obj.p46 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_46[0], place_46[1],46));;
  obj.p55 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_55[0], place_55[1],55));;
  obj.p58 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_58[0], place_58[1],58));;
  obj.p66 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_66[0], place_66[1],66));;
  obj.p106 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_106[0], place_106[1],106));;
  obj.p110 = parseInt(getDistanceFromLatLonInKm(myLocation[0] ,myLocation[1], place_110[0], place_110[1],110));;
  // document.getElementById('image1').src='images/p1.jpg';
  // document.getElementById('image2').src='images/p1.jpg';
  // document.getElementById('image3').src='images/p1.jpg';
  // document.getElementById('image4').src='images/p1.jpg';
  // document.getElementById('image5').src='images/p1.jpg';
  // document.getElementById('image6').src='images/p1.jpg';

  
  // obj["key3"] = "value3";

  var sortedCities = sortProperties(obj);

  var x = document.getElementById("place1");
  x.innerHTML ="Distance : "+sortedCities[0][1]+" m.";
  document.getElementById('image1').src='images/'+sortedCities[0][0]+'.jpg';
  showNamePlace(sortedCities[0][0], 1);
  var x2 = document.getElementById("btnlink1");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[0][0]+'"><button class="btn btn-primary">More Information</button></a><center>';


  var x = document.getElementById("place2");
  x.innerHTML ="Distance : "+sortedCities[1][1]+" m.";
  document.getElementById('image2').src='images/'+sortedCities[1][0]+'.jpg';
  showNamePlace(sortedCities[1][0], 2);
  var x2 = document.getElementById("btnlink2");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[1][0]+'"><button class="btn btn-primary">More Information</button></a><center>';

  var x = document.getElementById("place3");
  x.innerHTML ="Distance : "+sortedCities[2][1]+" m.";
  document.getElementById('image3').src='images/'+sortedCities[2][0]+'.jpg';
  showNamePlace(sortedCities[2][0], 3);
   var x2 = document.getElementById("btnlink3");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[2][0]+'"><button class="btn btn-primary">More Information</button></a><center>';

  var x = document.getElementById("place4");
  x.innerHTML ="Distance : "+sortedCities[3][1]+" m.";
  document.getElementById('image4').src='images/'+sortedCities[3][0]+'.jpg';
  showNamePlace(sortedCities[3][0], 4);
   var x2 = document.getElementById("btnlink4");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[3][0]+'"><button class="btn btn-primary">More Information</button></a><center>';

  var x = document.getElementById("place5");
  x.innerHTML ="Distance : "+sortedCities[4][1]+" m.";
  document.getElementById('image5').src='images/'+sortedCities[4][0]+'.jpg';
  showNamePlace(sortedCities[4][0], 5);
   var x2 = document.getElementById("btnlink5");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[4][0]+'"><button class="btn btn-primary">More Information</button></a><center>';

  var x = document.getElementById("place6");
  x.innerHTML ="Distance : "+sortedCities[5][1]+" m.";
  document.getElementById('image6').src='images/'+sortedCities[5][0]+'.jpg';
  showNamePlace(sortedCities[5][0], 6);
   var x2 = document.getElementById("btnlink6");
  x2.innerHTML ='<center><a href="checkin_show_place.html?place='+sortedCities[5][0]+'"><button class="btn btn-primary">More Information</button></a><center>';

  
    
}



function showNamePlace(place,line){
  switch(place) {
        case "p10":
            text = "ตลาดโบราณ";
        break;
        case "p27":
          text = "พระที่นั่งสรรเพชญปราสาท อยุธยา";
        break;
        case "p30":
          text = "หอพระแก้ว";
        break;
        case "p45":
          text = "ตลาดน้ำ";
        break;
        case "p55":
          text = "วัดจองคำ ลำปาง";
        break;
        case "p58":
          text = "วิหารวัดเชียงของ เชียงราย";
        break;
        case "p66":
          text = "พระธาตุบังพวน หนองคาย";
        break;
        case "p72":
          text = "ปราสาทพระวิหาร ศรีสะเกษ";
        break;
        case "p106":
          text = "พระโพธิสัตว์อวโลกิเตศวร ปางแสดงปาฎิหาริย์";
        break;
        case "p110":
          text = "ศาลาพระอรหัต์";
        break;
        case "p46":
          text = "วิหารวัดพร้าว ตาก";
        break;
        
    }
    var div_place = "name_place" + line;
    document.getElementById(div_place).innerHTML = text;
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





