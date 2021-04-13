class Validator {

    constructor() {
      this.validations = [
        'data-required',
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',      
        'data-equal',
        'data-password-validate',
      ]
    }
  
     //Start validations for all fields
    validate(form) {
  
      //Retrieves all validations
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      //Getting inputs 
      let inputs = form.getElementsByTagName('input');

      //Transform HTMLColletions in Array
      let inputsArray = [...inputs];
  
        //loops in inputs and validation upon which to found
      inputsArray.forEach(function(input) {
  
         //Loop on all existing validations
        for(let i = 0; this.validations.length > i; i++) {

          //Checks if the current validation exists in the inputs
          if(input.getAttribute(this.validations[i]) != null) {
  
             //Clearing string to transform into method
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            //input value
            let value = input.getAttribute(this.validations[i])
  
              //invoke the method
            this[method](input,value);
  
          }
        }
  
      }, this);
  
    }
    
    //Check if an input has a minimun of characters 
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `The field must have at least ${minValue} characters`;
  
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
     //Check whether an input has exceeded the character limit 
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `The field must have less than ${maxValue} characters`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //Validates if the field has only letters
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;
  
      let inputValue = input.value;
  
      let errorMessage = `This field doesn't accept numbers or special characters`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //E-mails validation
    emailvalidate(input) {

      //REGEX 
      //Ex: email@email.com OR email@email.com.br  
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Input an e-mail in the default: email@email.com or email@email.com.br`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //Checks if two fields are equal
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `This field must be the same as ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    
     //Checks if input is required
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `This field is required`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //This field is required
    passwordvalidate(input) {
  
       //Transform string in Array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `The password needs capital letter and a number`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //Method for printing error message on the screen
    printMessage(input, msg) {
    
      //Number of errors
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
   //Number of errors
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  //Getting the object id for later manipulation
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // evento de envio do form, que valida os inputs
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });
  