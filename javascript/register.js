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

    myForm.onsubmit = function () {
        storePersonArrayFromForm();
       var form = document.getElementById('id-form');
       form.reset();

        return false;  
   };

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
        console.log(personArrayAsString);
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
        console.log(divCheckPass);
        var valuePassword = document.getElementById('id-pass').value;
        var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/; 
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        if (valuePassword.match(passwordPattern)) {
          return  divCheckPass.style.display = "none";
        } else {
            return divCheckPass.innerHTML = "Please, enter a correct password";         }
        
            // removeErrorMessage();
        
    }

    // function removeErrorMessage() {
    //     passwordInput = document.getElementById("id-pass");
    //     var divCheckPass = document.getElementById("check-pass");
    //     passwordInput.onkeyup = function() {
    //     document.getElementById('id-pass').value = "";  
    //      return divCheckPass.style.display = "none";
    //     }
    // }

   

    // function passwordWarning() {
  
    // }

    // function createTextWarning() {
    //  return  document.createTextNode("Password should be at least six characters that are letters and include at least one number, one lowercase and one uppercase letter.");
    // }

    // var textWarning = createTextWarning();
    // console.log(textWarning);

    // function createParagraph() {
    //     var paragraph = document.createElement('p');
    //     paragraph.setAttribute('id', 'text-warning');
    //     return paragraph;
    // }

    // var paragraph = createParagraph();
    // console.log(paragraph);

    // function appendTexToParagraph() {
    //    return paragraph.appendChild(textWarning);
    // }

    // var paragraphWithText = appendTexToParagraph();
    // console.log(paragraphWithText);

    // function createDivWarning() {
    //     divPassWarning = document.createElement('div');
    //     divPassWarning.setAttribute('id', 'div-warning');
    //     return divPassWarning;
    // }

    // var divPassWarning = createDivWarning();
    // console.log(divPassWarning);

    // function appendParagraphToDiv() {
       
    //     return divPassWarning.appendChild(paragraph);
    // }

    // var divWithText = appendParagraphToDiv();
    // console.log(divWithText);

    // console.log(divPassWarning);

    // function appendDivToForm() {
    //     // form = document.getElementById('id-form');
    //     divPass = document.getElementById("div-pass");
    //     console.log(divPass);
    //  return divPass.appendChild(divPassWarning);
    // }


});