window.addEventListener("load", function() {  

    myFormLogin.onsubmit = function () {
        form = document.getElementById('id-form-login');
        compareStoredArrayWithUserDataFromLoginForm();
        return false;  
   };

    function getUserDataFromLoginForm() { 
        var form = document.forms["myFormLogin"];
        var valueEmail = getUserEmailFromForm(form);
        var valuePassword = getUserPasswordFromForm(form);
        var user =  createDataUserFromLoginForm(valueEmail, valuePassword);
        return user;
    }

    function getUserEmailFromForm(form) {
        var tagListEmail = form.elements["email"];
        var valueEmail = tagListEmail.value;
        return valueEmail;
    }

    function getUserPasswordFromForm(form) {
        var tagListPassword = form.elements["password"];
        var valuePassword = tagListPassword.value;
        return valuePassword;
    }

    function  createDataUserFromLoginForm(email, password) {
        return new UserLogin(email, password);
    }


    function getStoredPersonArrayFromBrowser() {
        var personArrayAsString = localStorage.getItem('personArray');
        var personArrayStoredInBrowser = JSON.parse(personArrayAsString);
        return personArrayStoredInBrowser;
    } 

    function compareStoredArrayWithUserDataFromLoginForm() {
        var loginSuccessful = document.getElementById("div-login-successful");
        var loginFailed = document.getElementById("div-login-failed")
        var userData = getUserDataFromLoginForm();
        var personArrayStoredInBrowser = getStoredPersonArrayFromBrowser();
        for (var i=0; i < personArrayStoredInBrowser.length; i++) {
            if((personArrayStoredInBrowser[i].email === userData.email) && (personArrayStoredInBrowser[i].password === userData.password)) {
              return loginSuccessful.style.display = "flex";
            }
        }
        return  loginFailed.style.display = "flex";
    }

    function setTimeoutForEmail() {
        emailInput = document.getElementById("id-email");
        var timeout = null;
        emailInput.onkeyup = function(setTypingTime) {    
            clearTimeout(timeout);
            timeout = setTimeout(function() {
               validateEmail();
            }, 1500);
        };
    }

    setTimeoutForEmail();

    function setTimeoutForPassword() {
        passwordInput = document.getElementById("id-password");
        var timeout = null;
        passwordInput.onkeyup = function(setTypingTime) {    
            clearTimeout(timeout);
            timeout = setTimeout(function() {
               validatePassword();
            }, 1500);
        };
    }

    setTimeoutForPassword();

    function validateEmail() {
        console.log("im in validate email");
        var valueEmail = document.getElementById('id-email').value;
        var checkTrue = document.getElementById('true1');
        console.log(checkTrue);
        var checkFalse = document.getElementById('false1');
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (valueEmail.match(emailPattern)) {
            checkFalse.style.display = "none";
            return checkTrue.style.display = "block";
        } else {
            checkTrue.style.display = "none"
            return checkFalse.style.display = "block";
        }
    }

    function validatePassword() {
        var valuePassword = document.getElementById('id-password').value;
        var checkTrue = document.getElementById('true2');
        var checkFalse = document.getElementById('false2');
        var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/; 
        if (valuePassword.match(passwordPattern)) {
          checkFalse.style.display = "none";
          return  checkTrue.style.display = "block";
        } else {
          checkTrue.style.display = "none";
          return  checkFalse.style.display = "block";
        }
    }

});
