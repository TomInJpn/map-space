function ajaxTagCreate(e)
{
  e.preventDefault();

  let method=this.getAttribute("method");
  let url=this.getAttribute("action");
  let formData=new FormData(this);
  let inputData={};
  let valueArry=[];

  formData.forEach(function(value,key)
  {
    if(key.endsWith("_ids[]"))
    {
      valueArry.push(value);
      inputData[key.replace('[]','')]=valueArry;
    }
    else
    {
      inputData[key]=value;
    }
  });

  let jsonData=JSON.stringify(inputData);console.log(jsonData);

  let xhr=new XMLHttpRequest();
  xhr.onload = function()
  {
    if (xhr.readyState===4)
    {
      if (xhr.status===200)
      {
        if(xhr.response)
        {
          addHtmlTag(xhr.response);
          addHtmlUsersTag(xhr.response);
          submit_tag__create.disabled=false;
          title.value='';
          explanation.value='';
        }
      }
      else
      {
        alert(`Tag Create Error ${xhr.status}:${xhr.statusText}`);
        submit_tag__create.disabled=false;
      }
    }
  };
  xhr.onerror=function()
  {
    alert(`Tag Create Error ${xhr.status}:${xhr.statusText}`);
  };
  xhr.open(method,`${url}.json`);
  xhr.responseType='json';
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(jsonData);
}



function addHtmlTag(res)
{
  if(res.title)
  {
    let stg=`<div class="tag__data" style="display:none;">
    <span name="tag__id">${res.id}</span>
    <span name="tag__x">${res.x}</span>
    <span name="tag__y">${res.y}</span>
    <span name="tag__title">${res.title}</span>
    </div>`;
    let temp=document.createElement('div');
    temp.innerHTML=stg;
    tag__datas.appendChild(temp.firstElementChild);
  }
}



function addHtmlUsersTag(res)
{
  if(res.title)
  {
    let stg=`<div class="currentUser_tag__data">
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



function ajaxGroupCreate(e)
{
  e.preventDefault();

  let method=this.getAttribute("method");
  let url=this.getAttribute("action");
  let formData=new FormData(this);
  let inputData={};
  let usersValueArry=[];
  let tagsValueArry=[];

  formData.forEach(function(value,key)
  {
    if(key=="user_ids[]")
    {
      usersValueArry.push(value);
      inputData[key.replace('[]','')]=usersValueArry;
    }
    else if(key=="tag_ids[]")
    {
      tagsValueArry.push(value);
      inputData[key.replace('[]','')]=tagsValueArry;
    }
    else
    {
      inputData[key]=value;
    }
  });

  let jsonData=JSON.stringify(inputData);

  let xhr=new XMLHttpRequest();
  xhr.onload = function()
  {
    if (xhr.readyState===4)
    {
      if (xhr.status===200)
      {
        if(xhr.response)
        {
          addHtmlGroup(xhr.response);
          addGroupdatInGroupdatas(xhr.response);
          group_form__submit.disabled=false;
          GroupName.value='';
          searchEmail.value='';
          searched_member.textContent = null;
          let groupMembers=document.querySelectorAll('#group_members>.user__data:nth-of-type(2)');
          for(let i=0;i<groupMembers.length;i++)
          {
            groupMembers[i].outerHTML='';
          }
          let groupTags=document.querySelectorAll('#group_tags .del_button')
          for(let i=0;i<groupTags.length;i++)
          {
            groupTags[i].click();
          }
        }
      }
      else
      {
        alert(`Group Create Error ${xhr.status}:${xhr.statusText}`);group_form__submit.disabled=false;
      }
    }
  };
  xhr.onerror=function()
  {
    alert(`Group Create Error ${xhr.status}:${xhr.statusText}`);
  };
  xhr.open(method,`${url}.json`);
  xhr.responseType='json';
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(jsonData);
}



function addHtmlGroup(res)
{
  let stg=`<input id="group_ids_${res.id}" name="group_ids[]" type="checkbox" value="${res.id}">
  <label for="group_ids_${res.id}">${res.name}</label>`;
  let temp=document.createElement('div');
  temp.innerHTML=stg;
  temp.childNodes.forEach(function(item){
    tag_form__group.appendChild(item);
  });
}



function addGroupdatInGroupdatas(res)
{
  let stg=`<li class="group__data">
  <span name="group__id" style="display:none;">${res.id}</span>
  <div class="group__name">${res.name}</div>
  </li>`;
  let temp=document.createElement('div');
  temp.innerHTML=stg;
  group__datas.appendChild(temp.firstElementChild);
}



function ajaxAddTag(e)
{
  this.removeAttribute('class');
  this.setAttribute('class','del_button');
  group_tags.appendChild(this.parentNode);
  e.target.removeEventListener('click',ajaxAddTag);
  e.target.addEventListener('click',ajaxDelTag);
  let groupTags=group_tags.getElementsByClassName('currentUser_tag__data');
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
  let searchTags=searched_tags.getElementsByClassName('currentUser_tag__data');
  let end=searchTags[0].clientHeight*searchTags.length;
  searched_tags.scrollTo({top:end,behavior:'smooth'});
}



function tagObserve()
{
  let target=document.getElementById('searched_tags');
  let originMarkersL=document.getElementsByClassName('currentUser_tag__data').length;
  let observer = new MutationObserver(function(records)
  {
    let markersL=document.getElementsByClassName('currentUser_tag__data').length;
    if(markersL>originMarkersL)
    {
      for(let i=0;i<records.length;i++)
      {
        records[i].addedNodes[0].lastElementChild.addEventListener('click',ajaxAddTag);
        originMarkersL=document.getElementsByClassName('currentUser_tag__data').length;
      }
    }
  })
  observer.observe
  (target,{
    childList:true
  })
}



function GroupNameIn()
{
  group_form__submit.disabled=true
}
function GroupNameOut()
{
  group_form__submit.disabled=false
}



function ajaxSearch(event)
{
  if(event.keyCode === 13)
  {
    let response = grecaptcha.getResponse();
    if(response.length!=0)
    {
      let unduplicate=true;
      existingMembers=Array.from(document.getElementsByClassName('user__data'));
      if(existingMembers.length!=0)
      {
        existingMembers.forEach
        (e=>{
          if(e.innerText.replace(/\r?\n/g,"")==searchEmail.value)
          {
            unduplicate=false;
          }
        });
      }
      if(unduplicate)
      {
        group_form__submit.disabled=true
        let token=document.getElementsByName('authenticity_token');
        let inputData={email:searchEmail.value,authenticity_token:token[0].value};
        let jsonData=JSON.stringify(inputData);
        let xhr=new XMLHttpRequest();
        let res=xhr.responseText;
        xhr.onload = function()
        {
          if (xhr.readyState===4)
          {
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
                group_form__submit.disabled=false
              }
              else
              {
                searchEmail.value='not matching';
                group_form__submit.disabled=false
              }
            }
            else
            {
              alert(`Mail Search Error ${xhr.status}:${xhr.statusText}`);
            }
          }
        };
        xhr.onerror=function()
        {
          alert(`Mail Search Error ${xhr.status}:${xhr.statusText}`);
        };
        xhr.open("POST",'/search.json');
        xhr.responseType='json';
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(jsonData);
      }
      else{
        searchEmail.value="Existing"
      }
    }else{
      searchEmail.value="click reCAPTCHA"
    }
  }
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
  let observer = new MutationObserver
  (function(records){
    if(records[0].addedNodes.length!=0)
    {
      records[0].addedNodes[0].lastElementChild.addEventListener('click',ajaxAddGroup);
      let searchMembers=searched_member.getElementsByClassName('user__data');
      let end=searchMembers[0].clientHeight*searchMembers.length;
      searched_member.scrollTo
      ({
        top:end,behavior:'smooth'
      });
    }
  })
  observer.observe
  (target,{
    childList:true
  })
}



function ajaxAutoReload()
{
  let existingTags=document.getElementsByClassName("tag__data");
  let tag_id=0
  if(existingTags.length>0)
  {
    tag_id=Number(existingTags[0].firstChild.nextSibling.innerText);
    for(let i=0;i<existingTags.length;i++)
    {
      if(tag_id<Number(existingTags[i].firstChild.nextSibling.innerText))
      {
        tag_id=Number(existingTags[i].firstChild.nextSibling.innerText);
      }
    }
  }
  let token=document.getElementsByName('authenticity_token');
  let inputData={id:tag_id,authenticity_token:token[0].value};
  let jsonData=JSON.stringify(inputData);

  let xhr=new XMLHttpRequest();
  xhr.onload = function()
  {
    if (xhr.readyState===4)
    {
      if (xhr.status===200)
      {
        if(xhr.response)
        {
          for(let i=0;i<xhr.response.length;i++)
          {
            addHtmlTag(xhr.response[i]);
          }
        }
      }
      else
      {
        alert(`Reload Error ${xhr.status}:${xhr.statusText}`);
      }
    }
  };
  xhr.onerror=function()
  {
    alert(`Reload Error ${xhr.status}:${xhr.statusText}`);
  };
  xhr.open('POST','/auto/search.json');
  xhr.responseType='json';
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(jsonData);
}





form_tag_create.addEventListener('submit',ajaxTagCreate);

if(typeof create_group!=='undefined')
{
  create_group.addEventListener('submit',ajaxGroupCreate);
  GroupName.addEventListener('focus',GroupNameIn);
  GroupName.addEventListener('blur',GroupNameOut);
}

if(typeof tag__datas!=='undefined')
{
  setInterval(ajaxAutoReload,60000);
  // setTimeout(ajaxAutoReload,60000);
}

if(typeof searchEmail!=='undefined')
{
  searchEmail.addEventListener('keydown',ajaxSearch);
}

if(typeof searched_tags!=='undefined')
{
  tagObserve();
  tagDatas=searched_tags.querySelectorAll('.currentUser_tag__data');
  for(let i=0;i<tagDatas.length;i++){tagDatas[i].lastElementChild.addEventListener('click',ajaxAddTag)}
}

if(typeof searched_member!=='undefined')
{
  memberObserve();
}
