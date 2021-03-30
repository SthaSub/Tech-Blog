const signUpFormHandler = async (event) =>{
  event.preventDefault();
  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const email = document.querySelector('#email-login').value.trim();
  const rePassword = document.querySelector('#re-password-login').value.trim(); 
  
  if(email && password && rePassword && name){
     if(password !== rePassword){
        alert('password should match');
        return;
     } 

    const response = await fetch('/api/users/registration', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page

      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};


const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        console.log("2000");
        // If successful, redirect the browser to the profile page
        
        // document.location.replace('/dashboard');
        window.location = '/dashboard';
      } else {
        alert(response.statusText);
      }
      // window.location.href = "/dashboard";
    })
  }

};


let sign = document
.querySelector('.signup-form');

// document
//   .querySelector('.signup-form')
  // .addEventListener('submit', signUpFormHandler);

  let login = document
  .querySelector('.login-form');
// document
//   .querySelector('.login-form')
  // .addEventListener('submit', loginFormHandler);

  if(sign){
    sign.addEventListener('submit', signUpFormHandler, false);
  }

  if(login){
    login.addEventListener('submit', loginFormHandler, false);
  }

  const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
  let log = document.querySelector('#logout');
  
  if(log)
      log.addEventListener('click', logout,false);