function ajaxForm(e)
{
  e.preventDefault();

  let method=this.getAttribute("method");
  let url=this.getAttribute("action");
  let formData=new FormData(this);
  let inputData={};

  formData.forEach(function(value,key)
  {
    if(key.endsWith("_ids[]"))
    {
      inputData[key.replace('[]','')]=[value];
    }
    else
    {inputData[key]=value;}
  });

  let jsonData=JSON.stringify(inputData);

  let xhr=new XMLHttpRequest();
  let res=xhr.responseText;
  xhr.onload = function(){
    if (xhr.readyState===4){
      if (xhr.status===200)
      {
        if(xhr.response)
        {
          addHtml(xhr.response);
          submit_tag__create.disabled=false;
          title.value='';
          explanation.value='';
        }
      }
      else
      {alert(`Tag Create Error ${xhr.status}:${xhr.statusText}`);}
    }
  };
  xhr.onerror=function(){alert(`Tag Create Error ${xhr.status}:${xhr.statusText}`);};
  xhr.open(method,`${url}.json`);
  xhr.responseType='json';
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(jsonData);
}



function addHtml(res)
{
  if(res.title)
  {
    let stg=`<div class="tag__data">
    <input id="tag_ids_${res.id}" name="tag_ids[]" style="display:none;" type="checkbox" value="${res.id}">
    <span name="tag__id" style="display:none;">${res.id}</span>
    <span name="tag__x" style="display:none;">${res.x}</span>
    <span name="tag__y" style="display:none;">${res.y}</span>
    <span name="tag__title">${res.title}</span>
    <label class="add_button" for="tag_ids_${res.id}"></label>
    </div>`;
    let temp=document.createElement('div');
    temp.innerHTML=stg;
    searched_tags.appendChild(temp.firstElementChild);
  }
}



function ajaxAddTag(e)
{
  this.removeAttribute('class');
  this.setAttribute('class','del_button');
  group_tags.appendChild(this.parentNode);
  e.target.removeEventListener('click',ajaxAddTag);
  e.target.addEventListener('click',ajaxDelTag);
  let groupTags=group_tags.getElementsByClassName('tag__data');
  let end=groupTags[0].clientHeight*groupTags.length;
  group_tags.scrollTo({top:end,behavior:'smooth'});
}



function ajaxDelTag(e)
{
  this.removeAttribute('class');
  this.setAttribute('class','add_button');
  searched_tags.appendChild(this.parentNode);
  e.target.removeEventListener('click',ajaxDelTag);
  e.target.addEventListener('click',ajaxAddTag);
  let searchTags=searched_tags.getElementsByClassName('tag__data');
  let end=searchTags[0].clientHeight*searchTags.length;
  searched_tags.scrollTo({top:end,behavior:'smooth'});
}



function tagObserve()
{
  let target=document.getElementById('searched_tags');
  let originMarkersL=document.getElementsByClassName('tag__data').length;
  let observer = new MutationObserver(function(records){
    let markersL=document.getElementsByClassName('tag__data').length;
    if(markersL>originMarkersL)
    {
      for(let i=0;i<records.length;i++)
      {
        records[i].addedNodes[0].lastElementChild.addEventListener('click',ajaxAddTag);
        originMarkersL=document.getElementsByClassName('tag__data').length
      }
    }
  })
  observer.observe(target,{
    childList:true
  })
}



function ajaxSearch()
{

  if(event.keyCode === 13)
  {
    let unduplicate=true;
    existingMembers=Array.from(document.getElementsByClassName('user__data'));
    if(existingMembers.length!=0){
      existingMembers.forEach(e=>{if(e.innerText.replace(/\r?\n/g,"")==searchEmail.value){unduplicate=false;}});
    }

    if(unduplicate)
    {
      let token=document.getElementsByName('authenticity_token');
      let inputData={email:searchEmail.value,authenticity_token:token[0].value};
      let jsonData=JSON.stringify(inputData);
      let xhr=new XMLHttpRequest();
      let res=xhr.responseText;
      xhr.onload = function(){
        if (xhr.readyState===4){
          if (xhr.status===200)
          {
            if(xhr.response)
            {
              searchEmail.value='';
              let temp=document.createElement('div');
              temp.innerHTML=`<div class="user__data">
              <input id="user_ids_${xhr.response.id}" name="user_ids[]" style="display:none;" type="checkbox" value="${xhr.response.id}">
              <span name="user__email">${xhr.response.email}</span>
              <label class="add_button" for="user_ids_${xhr.response.id}"></label>
              </div>`;
              searched_member.appendChild(temp.firstElementChild);
            }
            else{searchEmail.value='not matching';}
          }
          else
          {alert(`Mail Search Error ${xhr.status}:${xhr.statusText}`);}
        }
      };
      xhr.onerror=function(){alert(`Mail Search Error ${xhr.status}:${xhr.statusText}`);};
      xhr.open("POST",'/search.json');
      xhr.responseType='json';
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(jsonData);
    }
    else{searchEmail.value="Existing"}
  }
}
function ajaxSearchOn()
{
  create_group.setAttribute("onsubmit","return false");
}
function ajaxSearchOff()
{
  create_group.setAttribute("onsubmit","return true");
  group_form__submit.disabled=false;
}



function ajaxAddGroup(e)
{
  this.removeAttribute('class');
  this.setAttribute('class','del_button');
  group_members.appendChild(this.parentNode);
  e.target.removeEventListener('click',ajaxAddGroup);
  e.target.addEventListener('click',ajaxDelGroup);
  let groupMembers=group_members.getElementsByClassName('user__data');
  let end=groupMembers[1].clientHeight*groupMembers.length;
  group_members.scrollTo({top:end,behavior:'smooth'});
}



function ajaxDelGroup(e)
{
  this.removeAttribute('class');
  this.setAttribute('class','add_button');
  searched_member.appendChild(this.parentNode);
  e.target.removeEventListener('click',ajaxDelGroup);
  e.target.addEventListener('click',ajaxAddGroup);
  let searchMembers=searched_member.getElementsByClassName('user__data');
  let end=searchMembers[0].clientHeight*searchMembers.length;
  searched_member.scrollTo({top:end,behavior:'smooth'});
}



function memberObserve()
{
  let target=document.getElementById('searched_member');
  let observer = new MutationObserver(function(records){
    if(records[0].addedNodes.length!=0)
    {
      records[0].addedNodes[0].lastElementChild.addEventListener('click',ajaxAddGroup);
      let searchMembers=searched_member.getElementsByClassName('user__data');
      let end=searchMembers[0].clientHeight*searchMembers.length;
      searched_member.scrollTo({top:end,behavior:'smooth'});
    }
  })
  observer.observe(target,{
    childList:true
  })
}



function ajaxAutoSearch()
{
  let existingTags=document.getElementsByClassName("tag__data");
  if(existingTags.length>0)
  {
    let tag_id=Number(existingTags[0].firstChild.nextSibling.value);
    for(let i=0;i<existingTags.length;i++)
    {
      if(tag_id<Number(existingTags[i].firstChild.nextSibling.value)){tag_id=Number(existingTags[i].firstChild.nextSibling.value);}
    }
    let token=document.getElementsByName('authenticity_token');
    let inputData={id:tag_id,authenticity_token:token[0].value};
    let jsonData=JSON.stringify(inputData);

    let xhr=new XMLHttpRequest();
    xhr.onload = function(){
      if (xhr.readyState===4){
        if (xhr.status===200)
        {
          if(xhr.response)
          {
            for(let i=0;i<xhr.response.length;i++)
            {addHtml(xhr.response[i]);}
          }
        }
        else
        {alert(`Reload Error ${xhr.status}:${xhr.statusText}`);}
      }
    };
    xhr.onerror=function(){alert(`Reload Error ${xhr.status}:${xhr.statusText}`);};
    xhr.open('POST','/auto/search.json');
    xhr.responseType='json';
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(jsonData);
  }
}





form_tag_create.addEventListener('submit',ajaxForm);

if(typeof searchEmail!=='undefined')
{
  searchEmail.addEventListener('keydown',ajaxSearch);
  searchEmail.addEventListener('focus',ajaxSearchOn);
  searchEmail.addEventListener('blur',ajaxSearchOff);
}

if(typeof searched_tags!=='undefined')
{
  tagObserve();
  tagDatas=searched_tags.querySelectorAll('.tag__data');
  for(let i=0;i<tagDatas.length;i++){tagDatas[i].lastElementChild.addEventListener('click',ajaxAddTag)}
}

if(typeof searched_member!=='undefined')
  {memberObserve();}

// setInterval(ajaxAutoSearch,6000);
setTimeout(ajaxAutoSearch,6000);