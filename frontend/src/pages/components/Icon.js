import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: require("../../../public/redCircle.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 20),
  className: "leaflet-div-icon"
});
var myIcon = L.icon({
  iconUrl: "../../../public/redcircle.png", // pull out values as desired from the feature feature.properties.style.externalGraphic.
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

export { iconPerson };
