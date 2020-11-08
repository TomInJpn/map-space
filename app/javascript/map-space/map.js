function tagAddClickListener(map)
{
  let tagsInGroup=document.querySelectorAll('#group__datas [name="tag__title"]');
  for(let tag of tagsInGroup)
  {
    tag.addEventListener('click',(e)=>{
      let locateX=e.currentTarget.querySelector('[name="tag__x"]').innerHTML;
      let locateY=e.currentTarget.querySelector('[name="tag__y"]').innerHTML;
      let latlng=[locateY,locateX];
      map.panTo(latlng,{animate:true});
    });
  }
}

function tagInGropuObserve(map)
{
  let target=document.getElementById('group__datas');
  let observer = new MutationObserver
  (function(){
    tagAddClickListener(map);
  })
  observer.observe
  (target,{
    childList:true,subtree:true
  })
}

function outputPos(map_center,x,y)
{
  let pos = map_center.getCenter();
  x.setAttribute("value",pos.lng);
  y.setAttribute("value",pos.lat);
}

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
    let marker__popup=marker__data.tag__title.innerHTML+`<a rel="nofollow" href="/tags/${marker__data.tag__id.innerHTML}/edit" class="deleteAnchor">編集</a>`;
    marker[i]=L.marker([marker__data.tag__y.innerHTML,marker__data.tag__x.innerHTML]).addTo(map);
    marker[i].bindPopup(marker__popup,{'autoClose':false,'closeButton':false,'autoPan':false}).openPopup();
  }
}

function markerObserve(map){
  let target=document.getElementById('tag__datas');
  let originMarkersL=document.querySelectorAll('#tag__datas .tag__data').length;
  let observer = new MutationObserver(function(records){
    let markersL=document.querySelectorAll('#tag__datas .tag__data').length;
    if(markersL>originMarkersL)
    {
      for(let i=0;i<records.length;i++)
      {
        let marker=Array.from(records[i].addedNodes);
        markerDisplay(map,marker);
        markerAddDelete(marker);
        originMarkersL=document.querySelectorAll('#tag__datas .tag__data').length;
      }
    }
  })
  observer.observe(target,{
    childList:true
  })
}

function markerAddDelete(markers)
{
  let popup_edit=document.getElementsByClassName('leaflet-popup-content-wrapper');
  for(let i=0;i<markers.length;i++)
  {
    for(let j=0;j<popup_edit.length;j++)
    {
      let popup_edit_string=popup_edit[j].firstElementChild.firstElementChild.href;
      if(markers[i].firstElementChild.innerHTML==popup_edit_string.match(/\/\d+\//)[0].replace(/\//g,''))
      {
        let edit_anchor=popup_edit[j].getElementsByTagName('a');
        popup_edit[j].addEventListener('click',function(){(edit_anchor[0].style.display=="block")? edit_anchor[0].style.display="none":edit_anchor[0].style.display="block"});
      }
    }
  }
}



import icon from "../../assets/stylesheets/images/marker-icon.png";
import iconRetina from "../../assets/stylesheets/images//marker-icon-2x.png";
import iconShadow from "../../assets/stylesheets/images//marker-shadow.png";

if(navigator.geolocation)
{
	navigator.geolocation.getCurrentPosition(
    function(position)
    {
      if(typeof mymap!=='undefined')
      {
        let map = L.map('mymap',{preferCanvas:true,closePopupOnClick:false}).setView([position.coords.latitude,position.coords.longitude],18);
        let xCoo=document.getElementById('x');
        let yCoo=document.getElementById('y');
        let markers=Array.from(document.querySelectorAll('#tag__datas .tag__data'));

        markerDisplay(map,markers);

        markerAddDelete(markers);

        outputPos(map,xCoo,yCoo);

        map.on('click',function(e){map.panTo(e.latlng,{animate:true});});
        map.on('move',function(){outputPos(map,xCoo,yCoo);});

        // L.tileLayer('https://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
        //   attribution: "<a href='http://osm.org/copyright' rel='noreferrer' target='_blank'>OpenStreetMap</a> contributors"
        // }).addTo(map);
        // L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',{
        //   attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' rel='noreferrer' target='_blank'>地理院タイル</a>"
        // }).addTo(map);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(map);

        if(document.getElementById("searched_tags"))
        {
          markerObserve(map);
        }

        if(typeof group__datas!=='undefined')
        {
          tagInGropuObserve(map);
        }
      }
    }
  );
}
else
{
	alert("あなたの端末では、現在位置を取得できません。");
}