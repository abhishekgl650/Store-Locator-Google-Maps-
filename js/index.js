var map;
var markers = [];
var infoWindow;
var locationSelect;


function initMap() {
  var losAngeles = { lat: 34.063380, lng: -118.358080 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: 'roadmap',
  });
  infoWindow = new google.maps.InfoWindow();
  searchStores();

}

function searchStores(){
var foundStores = [];
var ZipCode = document.getElementById('zip-code-input').value;
if(ZipCode){
  stores.forEach(function(store,index){
    var postal = store.address.postalCode.substring(0,5);
    if(postal == ZipCode){
      foundStores.push(store);  
    }
    
  });
 
}
else{
  foundStores = stores;
}
clearLocations();
displayStores(foundStores);
showStoreMarkers(foundStores);
setOnClickListener();
}


function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;

}


function setOnClickListener()
{
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem,index){
   elem.addEventListener('click',function(){
       new google.maps.event.trigger(markers[index], 'click');
   });
  });


}

function displayStores(stores) {
  var storesHTML = '';
  stores.forEach(function (store, index) { //creating String literals
    var address = store.addressLines;
    var phone = store.phoneNumber;
    storesHTML += `       
   <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${index+1}</div>
                    </div>
                </div>
            </div>

     `
  });
  document.querySelector('.stores-list').innerHTML=storesHTML;
}

function showStoreMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);

    var name = store.name;
    var address = store.addressLines[0];
    createMarker(latlng, name, address, index);
    bounds.extend(latlng);
  });
  map.fitBounds(bounds);
}
  

function createMarker(latlng, name, address, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index + 1}` //string literal - converts a no into string value
  });
  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}