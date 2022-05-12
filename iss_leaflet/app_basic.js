var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () { return __awaiter(_this, void 0, void 0, function () {
    function getISS(apiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(apiUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    function updatePosition() {
        return __awaiter(this, void 0, void 0, function () {
            var data, date1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getISS(apiUrl)];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        console.log("button clicked");
                        latitude.textContent = data.iss_position.latitude.toLocaleString();
                        longitude.textContent = data.iss_position.longitude.toLocaleString();
                        date1 = new Date(data.timestamp * 1000);
                        date.textContent = date1.toLocaleString();
                        // iss.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
                        // const issIcon = L.imageOverlay("icons/issIcon.svg",[ [0,0] ,
                        // [0,0] ]).addTo(map);
                        iss.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
                        issIcon.setLatLng([
                            data.iss_position.latitude,
                            data.iss_position.longitude,
                        ]);
                        return [2 /*return*/];
                }
            });
        });
    }
    function setIntervalToggle() {
        if (!timeintervalcheckbox.checked) {
            clearInterval(timer);
        }
        else {
            timer = setInterval(function () { return updatePosition(); }, 2000);
        }
    }
    var date, latitude, longitude, map, apiUrl, update_btn, data, iss, myIcon, issIcon, timer, timeintervalcheckbox;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Your code goes here...!!");
                date = document.querySelector("#date");
                latitude = document.querySelector("#latitude");
                longitude = document.querySelector("#longitude");
                map = L.map("map").setView([0, 0], 1);
                L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0mdRbwqEV8ut5icPHfVq", {
                    attribution: '<a href="https://www.maptiler.com/copyright/", target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                }).addTo(map);
                apiUrl = "http://api.open-notify.org/iss-now.json";
                update_btn = document.getElementById("update-btn");
                return [4 /*yield*/, getISS(apiUrl)];
            case 1:
                data = _a.sent();
                iss = L.circle([data.iss_position.latitude, data.iss_position.longitude], {
                    radius: 80000,
                    color: "red"
                }).addTo(map);
                myIcon = L.icon({
                    iconUrl: "../icons/issIcon.svg",
                    iconSize: [96, 96],
                    iconAnchor: [48, 48]
                });
                issIcon = L.marker([data.iss_position.latitude, data.iss_position.longitude], { icon: myIcon })
                    .addTo(map)
                    .bindPopup("I'm here .., !")
                    .openPopup();
                update_btn.addEventListener("click", updatePosition);
                timer = setInterval(function () { return updatePosition(); }, 2000);
                timeintervalcheckbox = document.getElementById("timeintervalcheckbox");
                timeintervalcheckbox.addEventListener("click", setIntervalToggle);
                return [2 /*return*/];
        }
    });
}); })();
