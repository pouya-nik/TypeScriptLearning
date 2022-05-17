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
  let coordinates: number[][];

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
        text: "International Space Station(ISS)",
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
    // $("#map")
    //   .dxMap("instance")
    //   .addMarker({
    //     location: [data.iss_position.latitude, data.iss_position.longitude],
    //     tooltip: {
    //       text: "I'm here...",
    //     },
    //   });
    //   $("#map")
    //   .dxMap("instance")
    //   .removeMarker(0)
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
        DevExpress.ui.notify("The ISS position has been updated.");
      },
    });
    // timeintervall checkbox
    $(timeintervalcheckbox).dxCheckBox({
      text: "Time Intervall",
      value: true,
    });
    // Home button
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
    $("#map").dxVectorMap({
      title: {
        text: "ISS Position",
      },
      maxZoomFactor: 300,
      background: { borderColor: "#ffffff", color: "#80bfff" },
      layers: [
        {
          dataSource: "world.json",
          hoverEnabled: true,
          color: "#ffffcc",
        },
        {
          name: "ISScoordinate",
          dataSource: "iss_coordinate.json",
          colorGroupingField: "tag",
          colorGroups: [0, 1, 2],
          palette: ["#3c20c8", "#d82020"],
          borderColor: "none",
          hoverEnabled: false,
        },
      ],
    });
  });
})();

function isInputElement(element: HTMLElement): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}
