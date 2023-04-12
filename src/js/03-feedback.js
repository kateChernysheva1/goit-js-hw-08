import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KAY_VAL = 'feedback-form-state';

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
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

function validateEmail(value) {
  return EMAIL_REGEXP.test(value);
}

function formSubmit(e) {
  e.preventDefault();

  if (!obj.email || !obj.message) {
    alert('Заполните все поля!');
    return;
  }

  if (!validateEmail(obj.email)) {
    alert('Не валидная почта!');
    return;
  }

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
