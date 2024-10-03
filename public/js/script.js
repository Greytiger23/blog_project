const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})    

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})

const loginButton = document.querySelector('.button-field button');
loginButton.addEventListener('click', () => {
    console.log('Login button clicked!!')
})

const emailInput = document.querySelector('.input-filed  input[name="email"]');
const passwordInput = document.querySelector('.input-filed  input[name="password"]');
const emailValue = emailInput.value;
const passwordValue = passwordInput.value;
console.log(`Email value: ${emailValue}`);