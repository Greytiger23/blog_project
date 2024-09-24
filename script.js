// filter js
$(documnet).ready(function(){
    $('.filter-item').click(function(){
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.post-box').show('1000');
        }
        else{
            $('.post-box').not('.' + value).hide('1000');
            $('.post-box').filter('.' + value).show('1000');
        }
    });
    // active to btn
    $('.filter-item').click(function(){
        $(this).addClass("active-filter").siblings().removeClass('active-filter');
    });
});

// header change on scroll
let header = documnet.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

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