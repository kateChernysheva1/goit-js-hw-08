import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KAY_VAL = 'feedback-form-state';

let obj;

if (localStorage.getItem(KAY_VAL)) {
  obj = JSON.parse(localStorage.getItem(KAY_VAL));
  form.elements.email.value = obj.email;
  form.elements.message.value = obj.message;
} else {
  obj = {
    email: '',
    message: '',
  };
}

form.addEventListener('input', throttle(formType, 500));
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  console.log(obj);
  localStorage.removeItem(KAY_VAL);
  e.target.reset();
}

function formType(e) {
  if (e.target.name === 'email') {
    obj.email = e.target.value;
  }
  if (e.target.name === 'message') {
    obj.message = e.target.value;
  }

  localStorage.setItem(KAY_VAL, JSON.stringify(obj));
}
