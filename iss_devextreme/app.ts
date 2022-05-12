/// <reference path="../node_modules/devextreme/dist/ts/dx.all.d.ts" />
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

  let apiUrl: string = "http://api.open-notify.org/iss-now.json";

  async function getISS(apiUrl: string) {
    let response = await fetch(apiUrl);
    let data: IssData = await response.json();
    return data;
  }

  const update_btn = document.getElementById("update-btn");
  const data = await getISS(apiUrl);

  const issIconUrl = "/icons/issIcon1.svg";
  const markersData = [
    {
      location: [data.iss_position.latitude, data.iss_position.longitude],
      tooltip: {
        text: "I'm here...",
      },
    },
  ];

  async function updatePosition() {
    const data = await getISS(apiUrl);
    console.log(data);
    console.log("button clicked");

    latitude.textContent = data.iss_position.latitude.toLocaleString();
    longitude.textContent = data.iss_position.longitude.toLocaleString();

    const date1 = new Date(data.timestamp * 1000);
    date.textContent = date1.toLocaleString();

    $("#map")
      .dxMap("instance")
      .addMarker({
        location: [data.iss_position.latitude, data.iss_position.longitude],
        tooltip: {
          text: "I'm here...",
        },
      });
      $("#map")
      .dxMap("instance")
      .removeMarker(0) 
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
      stylingMode: "contained",
      text: "Update",
      type: "default",
      width: 120,
      onClick() {
        DevExpress.ui.notify("The Contained button was clicked");
      },
    });
    // timeintervall checkbox
    $(timeintervalcheckbox).dxCheckBox({
      text: "Time Intervall",
      value: true,
    });
    // exersize button
    const home_btn = document.getElementById("home-btn");
    $(home_btn).dxButton({
      stylingMode: "contained",
      text: "Home",
      type: "default",
      width: 120,
      onClick() {
        window.location.pathname = "";
      },
    });
    // map
    const mapTypes = [
      {
        key: "roadmap",
        name: "Road Map",
      },
      {
        key: "satellite",
        name: "Satellite (Photographic) Map",
      },
      {
        key: "hybrid",
        name: "Hybrid Map",
      },
    ] as const;
    const map_prop: DevExpress.ui.dxMap.Properties = {
      center: [data.iss_position.latitude, data.iss_position.longitude],
      zoom: 1,
      height: 400,
      width: "100%",
      provider: "bing",
      // apiKey: {
      //   // Specify your API keys for each map provider:
      //   // bing: "YOUR_BING_MAPS_API_KEY",
      //   // google: "YOUR_GOOGLE_MAPS_API_KEY",
      //   // googleStatic: "YOUR_GOOGLE_STATIC_MAPS_API_KEY"
      // },
      type: mapTypes[0].key,
      markerIconSrc: issIconUrl,
      markers: markersData,
    };
    const map = $("#map").dxMap(map_prop).dxMap("instance");

    $("#choose-type").dxSelectBox({
      dataSource: mapTypes,
      displayExpr: "name",
      valueExpr: "key",
      value: mapTypes[0].key,
      onValueChanged(data) {
        map.option("type", data.value);
      },
    });
  });
})();

function isInputElement(element: HTMLElement): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}
