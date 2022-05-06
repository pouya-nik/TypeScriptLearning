interface IssData {
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
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
  update_btn.addEventListener("click", async function handleClick(event) {
    const data = await getISS(apiUrl);
    console.log(data);
    console.log("button clicked");
    console.log(event);
    console.log(event.target);
    latitude.textContent = data.iss_position.latitude;
    longitude.textContent = data.iss_position.longitude;
    const date1 = new Date(data.timestamp * 1000);
    date.textContent = date1.toLocaleString();
  });
  
  const map = L.map("map").setView([0, 0], 1);
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0mdRbwqEV8ut5icPHfVq', {
      attribution: '<a href="https://www.maptiler.com/copyright/", target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' ,
  }).addTo(map);
  L.circle([50.5, 30.5], {radius: 200}).addTo(map);

})();
