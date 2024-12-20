const inputs = document.querySelectorAll("input");
const form = document.querySelector('form');
let isAllInputsValid = false;

const mode = document.getElementById('mode');
if(localStorage.getItem('mode')) {
    document.querySelector('html').setAttribute('data-theme', `${localStorage.getItem('mode')}`);
}else {
    document.querySelector('html').setAttribute('data-theme', 'dark');
}
mode.addEventListener('click', function() {
  if(mode.classList.contains('fa-sun')) {
    document.querySelector('html').setAttribute('data-theme', 'light');
    localStorage.setItem('mode', 'light');
    mode.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.querySelector('html').setAttribute('data-theme', 'dark');
    localStorage.clear();
    localStorage.setItem('mode', 'dark');
    mode.classList.replace('fa-moon', 'fa-sun');
  }
});


form.addEventListener("submit", function (e) {
  e.preventDefault();
  if(isAllInputsValid){
    setForm();
  }
});
form.addEventListener('input', () => {
    if(validationInputs(inputs[0]) && validationInputs(inputs[1])) {
        isAllInputsValid = true;
    }
})
async function setForm() {
        const user = {
            email: inputs[0].value,
            password: inputs[1].value,
          };
          const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
               'content-type': 'application/json'
            }
          })
          if(response.ok) {
            const data = await response.json();
            if(data.message === 'success') {
                localStorage.setItem('userToken', data.token);
                location.href = './home.html';
            }else {
                const msgError = data?.message;
                document.getElementById('msg').innerHTML = msgError;
                document.getElementById.style.color = 'red';
            }
          }
}
function validationInputs(element) {
    var regex = {
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
      }
    var term = element.value;
    if (regex[element.id].test(term)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }  
}