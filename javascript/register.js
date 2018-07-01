window.addEventListener("load", function() {
    
    function getPersonForm() { 
        var form = document.forms["myForm"];
        var valueName = getNamefromForm(form);
        var valueSurname = getSurnameFromForm(form);
        var valueEmail = getEmailFromForm(form);
        var valuePhone = getPhoneNumberFromForm(form);
        var valuePassword = getPasswordFromForm(form)
        var person =  createPerson(valueName, valueSurname, valueEmail, valuePhone, valuePassword); 
        return person;
    }

    function getNamefromForm(form) {
        var tagListName = form.elements["name"];
        var valueName = tagListName.value;
        return valueName;
    }

    function getSurnameFromForm(form) {
        var tagListSurname = form.elements["lastname"];
        var valueSurname = tagListSurname.value;
        return valueSurname;
    }

    function getEmailFromForm(form) {
        var tagListEmail = form.elements["email"];
        var valueEmail = tagListEmail.value;
        return valueEmail;
    }

    function getPhoneNumberFromForm(form) {
        var tagListPhone = form.elements["mobileNumber"];
        var valuePhone = tagListPhone.value;
        return valuePhone;
    }

    function getPasswordFromForm(form) {
        var tagListPassword = form.elements["password"];
        var valuePassword = tagListPassword.value;
        return valuePassword;
    }


  var button = document.getElementById('button');
  button.addEventListener('click', validateFormOnClickButton);

   function validateFormOnClickButton() {
        var form = document.getElementById('id-form');
        storePersonArrayFromForm();
        validateInputsForm();
        changeBorderBottomColorToRedOfEmptyInputs();
   }

   function storePersonArrayFromForm() {
        var personArrayFromStorage = getPersonArrayFromBrowser();
        var person = getPersonForm();
        personArrayFromStorage.push(person);        
        storePersonArrayInBrowser(personArrayFromStorage);
   }

   function createPerson(name, surname, email, phoneNumber, password) {
       return new Person(name, surname, email, phoneNumber, password);
   }

   function storePersonArrayInBrowser(personArrayFromStorage) {
        var personArrayAsString = JSON.stringify(personArrayFromStorage);
        var personArrayStoredInBrowser = localStorage.setItem('personArray', personArrayAsString);
        return personArrayStoredInBrowser;
   }

   function getPersonArrayFromBrowser() {
        var personArrayAsString = localStorage.getItem('personArray');
        if (personArrayAsString === null) {
            return [];
        } 
        var personArrayStoredInBrowser = JSON.parse(personArrayAsString);
        return personArrayStoredInBrowser;
    }

    function eventPasswordWarning() {
      var inputPassword = document.getElementById("id-pass");
      var warningDiv = document.getElementById('pass-warning');
      inputPassword.onfocus = function() {
        warningDiv.innerHTML = "Password should be at least six characters that are letters and include at least one number, one lowercase and one uppercase letter.";
      }
    }

    eventPasswordWarning();

    function setTimeoutForPassword() {
        passwordInput = document.getElementById("id-pass");
        var timeout = null;
        passwordInput.onkeyup = function(setTypingTime) {    
            clearTimeout(timeout);
            timeout = setTimeout(function() {
               validatePass();  
            }, 1000);
      
        };
    }

    setTimeoutForPassword();

    function validatePass() {
        var divCheckPass = document.getElementById("check-pass");
        var valuePassword = document.getElementById('id-pass').value;
        var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/; 
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        if (valuePassword.match(passwordPattern)) {
          return  divCheckPass.style.display = "none";
        } else {
          return divCheckPass.innerHTML = "Please, enter a correct password";         }  
    }

    function validateInputsForm() {
        form = document.getElementById("id-form").elements;
        for (var i = 0; i < form.length; i++) {
            if (form[i].value === "") {
             return messageFailedRegistration();
            } 
        } 
        return messageAccountCreated(); 
    }

    function messageAccountCreated() {
        var divAccountCreated = document.getElementById("div-accountCreated");
        var divAccountFailed = document.getElementById("div-accountFailed");
        divAccountCreated.style.display = "flex";
        divAccountFailed.style.display = "none";
        // resetForm();
    }

    // function resetForm() {
    //     var form = document.getElementById('id-form');
    //     form.reset();
    //     var inputs = document.getElementsByClassName('input');
    //     for (var i = 0; i < inputs.length; i++) {
    //         inputs[i].style.borderBottom = "1px solid #B375B3";
    //     }
    // }

    function messageFailedRegistration() {
        var divAccountFailed = document.getElementById("div-accountFailed");
        var divAccountCreated = document.getElementById("div-accountCreated")
        divAccountFailed.style.display = "flex";
        divAccountCreated.style.display = "none";
    }

    function changeBorderBottomColorToRedOfEmptyInputs() {
        var timeout = null;
        var form = document.getElementById('id-form');
        var inputs = document.getElementsByClassName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].style.borderBottom = "1px solid red";
                inputs[i].onkeyup = function(setTypingTime) {    
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        changeInputsBorderBottomColorFromRedToPurpleAfterTyping();
                      
                    }, 1000);
                };
            } else {
                inputs[i].style.borderBottom = "1px solid #B375B3";
            }
        }
    }

    function changeInputsBorderBottomColorFromRedToPurpleAfterTyping() {
        var inputs = document.getElementsByClassName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value) {
               inputs[i].style.borderBottom = "1px solid #B375B3";
            }
        }
        deleteEmptyFieldsMessageIfAllInputsAreFilled();
    }

    function deleteMessageFillEmptyFields() {
        console.log('I delete the ERROR DIV');
        var divAccountFailed = document.getElementById("div-accountFailed");
        divAccountFailed.style.display = "none";
    }

    function deleteEmptyFieldsMessageIfAllInputsAreFilled() {
        var inputs = document.getElementsByClassName('input');
        for (var i = 0; i < inputs.length; i++) { 
            if (!isInputFieldValid(inputs[i])) {
               return false;
            }
        }
        deleteMessageFillEmptyFields();
        return true;
    }

    function isInputFieldValid(inputField) {
        return inputField.value && inputField.value != "";
    }

});