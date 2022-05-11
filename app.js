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
/// <reference path="node_modules/devextreme/dist/ts/dx.all.d.ts" />
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
    // const issIcon = L.marker(
    //   [data.iss_position.latitude, data.iss_position.longitude],
    //   { icon: myIcon }
    // )
    //   .addTo(map)
    //   .bindPopup("I'm here .., !")
    //   .openPopup();
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
    var date, latitude, longitude, apiUrl, update_btn, data, myIcon, timer, timeintervalcheckbox;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Your code goes here...!!");
                date = document.querySelector("#date");
                latitude = document.querySelector("#latitude");
                longitude = document.querySelector("#longitude");
                apiUrl = "http://api.open-notify.org/iss-now.json";
                update_btn = document.getElementById("update-btn");
                return [4 /*yield*/, getISS(apiUrl)];
            case 1:
                data = _a.sent();
                myIcon = L.icon({
                    iconUrl: "icons/issIcon.svg",
                    iconSize: [96, 96],
                    iconAnchor: [48, 48]
                });
                update_btn.addEventListener("click", updatePosition);
                timer = setInterval(function () { return updatePosition(); }, 2000);
                timeintervalcheckbox = document.getElementById("timeintervalcheckbox");
                timeintervalcheckbox.addEventListener("click", setIntervalToggle);
                // JQuery 
                $(function () {
                    // update button
                    $(update_btn).dxButton({
                        stylingMode: 'contained',
                        text: 'Update',
                        type: "default",
                        width: 120,
                        onClick: function () {
                            DevExpress.ui.notify('The Contained button was clicked');
                        }
                    });
                    // timeintervall checkbox 
                    $(timeintervalcheckbox).dxCheckBox({
                        value: true
                    });
                    // map
                    var mapTypes = [{
                            key: 'roadmap',
                            name: 'Road Map'
                        }, {
                            key: 'satellite',
                            name: 'Satellite (Photographic) Map'
                        }, {
                            key: 'hybrid',
                            name: 'Hybrid Map'
                        }];
                    var map = $("#map").dxMap({
                        center: [data.iss_position.latitude, data.iss_position.longitude],
                        zoom: 1,
                        height: 400,
                        width: '100%',
                        provider: 'bing',
                        apiKey: {
                        // Specify your API keys for each map provider:
                        // bing: "YOUR_BING_MAPS_API_KEY",
                        // google: "YOUR_GOOGLE_MAPS_API_KEY",
                        // googleStatic: "YOUR_GOOGLE_STATIC_MAPS_API_KEY"
                        }
                    }).dxMap('instance');
                    $('#choose-type').dxSelectBox({
                        dataSource: mapTypes,
                        displayExpr: 'name',
                        valueExpr: 'key',
                        value: mapTypes[0].key,
                        onValueChanged: function (data) {
                            map.option('type', data.value);
                        }
                    });
                });
                return [2 /*return*/];
        }
    });
}); })();
// Element function htmlinputelement(){
// }
