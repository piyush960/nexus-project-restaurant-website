const sign_up_btn = document.getElementById("sign-up-btn");
const sign_in_btn = document.getElementById("sign-in-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
})

sign_in_btn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
})

const loginForm = document.querySelector('form.sign-in');
const signupForm = document.querySelector('form.sign-up');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    showSucessFor(loginForm.userName);
    showSucessFor(loginForm.password);
    e.target.firstElementChild.classList.remove('show');

    const userEmailName = loginForm.userName;
    const password = loginForm.password;

    try{
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmailName: userEmailName.value.trim(),
                password: password.value.trim()
            })
        })

        const result = await response.json();
        console.log(result);
        if(result.error){
            showErrorFor(userEmailName, result.error.userEmailName);
            showErrorFor(password, result.error.password);
        }
        if(result.user){
            const signInUser = loginForm.userName.parentElement;
            const signInPass = loginForm.password.parentElement;
            if(signInUser.classList.contains('success') && signInPass.classList.contains('success')){
                loginForm.firstElementChild.classList.add('show');
            }
            setTimeout(redirectToHome, 2000);
        }
    }catch(e){
        console.log(e);
    }


    
})

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    showSucessFor(signupForm.userName);
    showSucessFor(signupForm.email);
    showSucessFor(signupForm.password);
    showSucessFor(signupForm.password2);
    e.target.firstElementChild.classList.remove('show');

    postData(signupForm);
})

async function postData(form){
    const userName = form.userName.value.trim();
    const password = form.password.value.trim();
    const email = form.email.value.trim();
    try{
        const response = await fetch('/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                password,
                email
            })
        })
    
        const result = await response.json();
        console.log(result);
        if(result.error){
            showErrorFor(form.email, result.error.email);
            showErrorFor(form.userName, result.error.userName);
            showErrorFor(form.password, result.error.password);
        }
        if(form.password2.value !== form.password.value){
            showErrorFor(form.password2, "password doesn't match");
        }
        else if(result.user){
            checkSuccess(form);
            setTimeout(redirectToHome, 1000);
        }

    }catch(e){
        console.log(e);
    }
}

function redirectToHome(){
    location.assign('/');
}

function checkSuccess(form){
    console.log(form);
    const signUpUser = form.userName.parentElement;
    const signUpEmail = form.email.parentElement;
    const signUpPassword = form.password.parentElement;
    const signUpPassword2 = form.password2.parentElement;
    
    if(signUpUser.classList.contains('success') && signUpEmail.classList.contains('success') && signUpPassword.classList.contains('success') && signUpPassword2.classList.contains('success')){
        form.firstElementChild.classList.add('show');
    }
}

function showErrorFor(input, msg){
    const formField = input.parentElement;
    if(msg.length > 0){
        formField.classList.remove('success');
        formField.classList.add('error');
        input.nextElementSibling.textContent = msg;
    }
}

function showSucessFor(input){
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    input.nextElementSibling.textContent = '';
}