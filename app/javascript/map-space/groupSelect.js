function groupSelect(){
  inputTags=document.querySelectorAll('#tag_form__group input');
  labelTag=Array.from(document.querySelectorAll('#tag_form__group label'));
  num=labelTag.indexOf(this);
  if(num>0&&!inputTags[num].checked)
  {
    inputTags[0].checked=false;
  }
  else if(num==0&&!inputTags[num].checked)
  {
    inputTags.forEach(function(inputTag)
    {
      inputTag.checked=false;
    });
  }
  else
  {
    inputTags[0].checked=false;
  }
}



document.querySelectorAll('#tag_form__group label').forEach(function(label){
  label.addEventListener('click',groupSelect);
});