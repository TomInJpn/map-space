if(navigator.geolocation)
{
	navigator.geolocation.getCurrentPosition(
    function(position)
    {
      let map = L.map('mymap',{closePopupOnClick:false}).setView([position.coords.latitude,position.coords.longitude],18);

      let markers=Array.from(document.getElementsByClassName('tag__data'));
      let marker=[];

      for(let i=0;i<markers.length;i++)
      {
        let marker__data=markers[i].children;
        marker__popup=marker__data.tag__title.innerHTML+'<a rel="nofollow" data-method="delete" href="/tags/'+marker__data.tag__id.innerHTML+'">削除</a>';
        marker[i]=L.marker([marker__data.tag__y.innerHTML,marker__data.tag__x.innerHTML]).addTo(map);
        marker[i].bindPopup(marker__popup,{'autoClose':false,'closeButton':false}).openPopup();
      }

      map.panTo([position.coords.latitude,position.coords.longitude]);

      let xCoo=document.getElementById('x');
      let yCoo=document.getElementById('y');
      outputPos(map,xCoo,yCoo);
      map.on('move',function(e){outputPos(map,xCoo,yCoo);});
      map.on('click',function(e){map.panTo(e.latlng,{animate:true});});

      let popup_delete=document.getElementsByClassName('leaflet-popup-content-wrapper');
      for(let i=0;i<markers.length;i++)
      {
        let delete_anchor=popup_delete[i].getElementsByTagName('a');
        popup_delete[i].addEventListener('click',function(e){(delete_anchor[0].style.display=="block")? delete_anchor[0].style.display="none":delete_anchor[0].style.display="block"});
      }

      // L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
      //   attribution: "<a href='http://osm.org/copyright' rel='noreferrer' target='_blank'>OpenStreetMap</a> contributors"
      // }).addTo(map);
      L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' rel='noreferrer' target='_blank'>地理院タイル</a>"
      }).addTo(map);
    }
  );
}
else
{
	alert("あなたの端末では、現在位置を取得できません。");
}

function outputPos(map_center,x,y)
{
  var pos = map_center.getCenter();
  x.setAttribute("value",pos.lng);
  y.setAttribute("value",pos.lat);
}