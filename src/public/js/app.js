const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
let formData ={
    name: name.value,
    email:email.value,
    subject:subject.value,
    message:message.value
    }
// console.log("formData");
console.log(formData);
let xhr = new XMLHttpRequest();
xhr.open('POST','/report');
xhr.setRequestHeader('content-type','application/json');
xhr.onload = function(){
  console.log(xhr.responseText);
  if(xhr.responseText == 'success')
  {
      alert('Email sent');
      subject.value = '';
      message.value = '';
  }  
  else
  {
      alert("error");
  }
}

xhr.send(JSON.stringify(formData));

})