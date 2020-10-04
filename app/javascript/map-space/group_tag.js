let groupDatas=document.querySelectorAll('.group__data');
let authenticityToken=document.querySelector("input[name='authenticity_token']");

for(let groupData of groupDatas)
{
  groupData.addEventListener('mouseenter',()=>{
    ajaxGroupMenu(authenticityToken.value, groupData.firstChild.nextSibling.innerText, groupData);
  });
  groupData.addEventListener('mouseleave',(e)=>{
    e.currentTarget.getElementsByTagName('ul')[0].outerHTML='';
  });
}

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

function ajaxGroupMenu(autCityToken, groupID, groupData)
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

function gropuMenuObserve()
{
  let target=document.getElementById('group__datas');
  let observer = new MutationObserver
  (function(records){
    records[0].addedNodes[0].addEventListener('mouseover',()=>{
      ajaxGroupMenu(authenticityToken.value, records[0].addedNodes[0].firstChild.nextSibling.innerText, records[0].addedNodes[0]);
    });
  })
  observer.observe
  (target,{
    childList:true
  })
}

if(typeof group__datas!=='undefined')
{
  gropuMenuObserve();
}

if(typeof group__menu!=='undefined')
{
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
}
