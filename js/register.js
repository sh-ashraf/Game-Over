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
  if(isAllInputsValid && inputs[2].value === inputs[3].value){
    setForm();
  }
});
form.addEventListener('input', () => {
    if(validationInputs(inputs[0])
    && validationInputs(inputs[1])
    && validationInputs(inputs[2]) 
    && validationInputs(inputs[3])
    && validationInputs(inputs[4])) {
        isAllInputsValid = true;
    }
})
async function setForm() {
        const user = {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            rePassword: inputs[3].value,
            phone: inputs[4].value,
          };
          const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
               'content-type': 'application/json'
            }
          })
          if(response.ok) {
            const data = await response.json();
            console.log(data);
            if(data.message === 'success') {
                toastr.success('Done Successfully!', 'SignUp')               
                setTimeout(()=> {
                  location.href = './index.html';
                }, 1000)
            }else {
                const msgError = data.errors?.email.message;
                document.getElementById('msg').innerHTML = msgError;
                document.getElementById.style.color = 'red';
            }
          }
}
function validationInputs(element) {
    var regex = {
        name:/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        rePassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        phone: /^01[0125]\d{8}$/,
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