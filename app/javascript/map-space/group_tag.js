let groupDatas=document.querySelectorAll('.group__data');
let authenticityToken=document.querySelector("input[name='authenticity_token']");

for(let groupData of groupDatas)
{
  groupData.addEventListener('mouseover',()=>{
    ajaxGroupMenu(authenticityToken.value,groupData.firstChild.nextSibling.innerText,groupData);
  });
}

group__menu.addEventListener('click',function()
{
  if(group__datas.classList.contains("close"))
  {
    group__datas.classList.remove("close");
  }
  else
  {
    group__datas.classList.add("close");
  }
});

function tagsInGroup(tags,groupData)
{
  stg=""
  for(let tag of tags)
  {
    stg+=`<li name="tag__title">${tag.title}<span name="tag__x">${tag.x}</span><span name="tag__y">${tag.y}</span></li>`;
  }
  stg=`<ul style="min-height:${groupData.parentNode.clientHeight}px;">${stg}</ul>`
  let temp=document.createElement('div');
  temp.innerHTML=stg;
  groupData.appendChild(temp.firstElementChild);
}

function ajaxGroupMenu(autCityToken,groupID,groupData)
{
  let group_data={'authenticity_token':autCityToken,'group_id':groupID}
  let jsonData=JSON.stringify(group_data);
  let xhr=new XMLHttpRequest();
  xhr.onload = function()
  {
    if (xhr.readyState===4)
    {
      if (xhr.status===200)
      {
        if(xhr.response)
        {
          tagsInGroup(xhr.response,groupData);
        }
      }
      else
      {
        alert(`Group Create Error ${xhr.status}:${xhr.statusText}`);
      }
    }
  };
  xhr.onerror=function()
  {
    alert(`Group Create Error ${xhr.status}:${xhr.statusText}`);
  };
  xhr.open('POST',`/searchtags.json`);
  xhr.responseType='json';
  xhr.setRequestHeader('Content-Type','application/json');
  if(groupData.getElementsByTagName('ul').length==0)
  {
    xhr.send(jsonData);
  }
}
