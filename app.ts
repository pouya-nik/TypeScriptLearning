/// <reference path="node_modules/devextreme/dist/ts/dx.all.d.ts" />
interface IssData {
  timestamp: number;
  iss_position: {
    latitude: number;
    longitude: number;
  };
}

(async () => {
  console.log("Your code goes here...!!");
  const date = document.querySelector("#date");
  const latitude = document.querySelector("#latitude");
  const longitude = document.querySelector("#longitude");
  // const map = L.map("map").setView([0, 0], 1);
  // L.tileLayer(
  //   "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0mdRbwqEV8ut5icPHfVq",
  //   {
  //     attribution:
  //       '<a href="https://www.maptiler.com/copyright/", target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  //   }
  // ).addTo(map);

  let apiUrl: string = "http://api.open-notify.org/iss-now.json";

  async function getISS(apiUrl: string) {
    let response = await fetch(apiUrl);
    let data: IssData = await response.json();
    return data;
  }

  const update_btn = document.getElementById("update-btn");
  const data = await getISS(apiUrl);
  // const iss = L.circle(
  //   [data.iss_position.latitude, data.iss_position.longitude],
  //   {
  //     radius: 80000,
  //     color: "red",
  //   }
  // ).addTo(map);

  const myIcon = L.icon({
    iconUrl: "icons/issIcon.svg",
    iconSize: [96, 96],
    iconAnchor: [48, 48],
  });

  // const issIcon = L.marker(
  //   [data.iss_position.latitude, data.iss_position.longitude],
  //   { icon: myIcon }
  // )
  //   .addTo(map)
  //   .bindPopup("I'm here .., !")
  //   .openPopup();

  async function updatePosition() {
    const data = await getISS(apiUrl);
    console.log(data);
    console.log("button clicked");

    latitude.textContent = data.iss_position.latitude.toLocaleString();
    longitude.textContent = data.iss_position.longitude.toLocaleString();

    const date1 = new Date(data.timestamp * 1000);
    date.textContent = date1.toLocaleString();
    
    // iss.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
    // issIcon.setLatLng([
    //   data.iss_position.latitude,
    //   data.iss_position.longitude,
    // ]);
  }
  update_btn.addEventListener("click", updatePosition);
  let timer = setInterval(() => updatePosition(), 2000);
  const timeintervalcheckbox = document.getElementById(
    "timeintervalcheckbox"
  ) as HTMLInputElement;
  function setIntervalToggle() {
    if (!timeintervalcheckbox.checked) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => updatePosition(), 2000);
    }
  }
  timeintervalcheckbox.addEventListener("click", setIntervalToggle);
  // JQuery 
$(() => {
  // update button
  $(update_btn).dxButton({
    stylingMode: 'contained',
    text: 'Update',
    type: "default",
    width: 120,
    onClick() {
      DevExpress.ui.notify('The Contained button was clicked');
    },
  });
  // timeintervall checkbox 
  $(timeintervalcheckbox).dxCheckBox({
    value: true,
  });

  // map
  const mapTypes = [{
    key: 'roadmap',
    name: 'Road Map',
  }, {
    key: 'satellite',
    name: 'Satellite (Photographic) Map',
  }, {
    key: 'hybrid',
    name: 'Hybrid Map',
  }];

  // const map = $("#map").dxMap ({
  //   center: [data.iss_position.latitude, data.iss_position.longitude] ,
  //   zoom: 1,
  //   height: 400,
  //   width: '100%',
  //   provider: 'bing',
  //   apiKey: {
  //     // Specify your API keys for each map provider:
  //     // bing: "YOUR_BING_MAPS_API_KEY",
  //     // google: "YOUR_GOOGLE_MAPS_API_KEY",
  //     // googleStatic: "YOUR_GOOGLE_STATIC_MAPS_API_KEY"
  //   },
  //   type: mapTypes[0],
  // }).dxMap('instance');

  $('#choose-type').dxSelectBox({
    dataSource: mapTypes,
    displayExpr: 'name',
    valueExpr: 'key',
    value: mapTypes[0].key,
    onValueChanged(data) {
      map.option('type', data.value);
    },
  });
});

})();

// Element function htmlinputelement(){

// }
