import icon from "../../assets/stylesheets/images/marker-icon.png";
import iconRetina from "../../assets/stylesheets/images//marker-icon-2x.png";
import iconShadow from "../../assets/stylesheets/images//marker-shadow.png";

function markerDisplay(map,markers)
{
  let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  let marker=[];
  for(let i=0;i<markers.length;i++)
  {
    let marker__data=markers[i].children;
    let marker__popup=marker__data.tag__title.innerHTML;
    marker[i]=L.marker([marker__data.tag__y.innerHTML,marker__data.tag__x.innerHTML]).addTo(map);
    marker[i].bindPopup(marker__popup,{'autoClose':false,'closeButton':false,'autoPan':false}).openPopup();
  }
}

if(typeof mymap__tagedit!=='undefined'){
  let markers=Array.from(document.querySelectorAll('#tag__datas .tag__data'));
  let map_tag_edit = L.map('mymap__tagedit').setView(
    [
      markers[0].querySelector('[name="tag__y"]').innerHTML,
      markers[0].querySelector('[name="tag__x"]').innerHTML
    ]
    ,18
    );

  markerDisplay(map_tag_edit,markers);

  L.tileLayer('https://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution: "<a href='http://osm.org/copyright' rel='noreferrer' target='_blank'>OpenStreetMap</a> contributors"
  }).addTo(map_tag_edit);

  x.setAttribute("value",markers[0].querySelector('[name="tag__x"]').innerHTML);
  y.setAttribute("value",markers[0].querySelector('[name="tag__y"]').innerHTML);
}
