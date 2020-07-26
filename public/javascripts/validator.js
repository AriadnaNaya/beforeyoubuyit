window.addEventListener('load', function(){

    var newUserForm = document.querySelector('form.user-register-form');
    var userLoginForm = document.querySelector('form.user-login-form');
    
    if(newUserForm){

        newUserForm.addEventListener('submit', function(e){
            var errors = [];
    
            var avatarInput = document.querySelector('.avatar');
            var firstNameInput = document.querySelector('.name');
            var lastNameInput = document.querySelector('.lastName');
            var emailInput = document.querySelector('.email');
            var passwordInput = document.querySelector('.password');
            var passwordConfirmInput = document.querySelector('.passwordConfirm');
      
    
            if(avatarInput.value == ''){
                errors.push('Elige tu avatar.');
            }
            
            if(firstNameInput.value == ''){
                errors.push('Por favor, ingresa tu nombre');
            } else if (firstNameInput.value.length < 2 ) {
                errors.push('El campo nombre debe tener 2 caracteres como mínimo');
            }
    
            if(lastNameInput.value == ''){
                errors.push('No olvides ingresar tu apellido');
            } else if (lastNameInput.value.length < 3 ) {
                errors.push('Tu apellido debe tener más de 3 caracteres.');
            }
    
            if(emailInput.value == ''){
                errors.push('No te pierdas nuestras promociones, ingresá tu e-mail');
            }else{
                var email = emailInput.value;
    
                function emailCheck(email) {
                    const symbols = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var result = symbols.test(String(email).toLowerCase());
                    if (result == false){
                        errors.push('Ingresá un e-mail válido.');
                    }
                }
            }
    
            if(passwordInput.value == ''){
                errors.push('Crea tu nueva contraseña.');
            } else if (passwordInput.value.length < 8 ) {
                errors.push('Tu contraseña debe tener más de 8 caracteres.');
            }

            if(passwordConfirmInput.value == ''){
                errors.push('Crea tu nueva contraseña.');
            } else if (passwordConfirmInput.value.length < 8 ) {
                errors.push('Tu contraseña debe tener más de 8 caracteres.');
            }
                
    
            if(errors.length > 0){
                e.preventDefault();
    
                document.querySelector('div.errors-feedback').style.display = 'flex';
                document.querySelector('div.errors-feedback').innerHTML = '<ul></ul>'
    
                var listErrors = document.querySelector('div.errors-feedback ul');
    
                for(var i = 0; i < errors.length; i++){
                    listErrors.innerHTML += "<li>" + " &raquo; " + errors[i] + '</li>';
                }
            }
    
        })
    };
    
    if(userLoginForm){

        userLoginForm.addEventListener('submit', function(e){
            var errors = [];
    
            var emailInput = document.querySelector('.email');
            var passwordInput = document.querySelector('.password');
    
            if(emailInput.value == ''){
                errors.push('Ingresá tu e-mail para acceder a tu cuenta.');
            }else{
                var email = emailInput.value;
    
                function emailCheck(email) {
                    const symbols = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var result = symbols.test(String(email).toLowerCase());
                    if (result == false){
                        errors.push('Tu email no es válido.');
                    }
                }
            }
    
            if(passwordInput.value == ''){
                errors.push('Ingresa tu contraseña.');
            }

            if(errors.length > 0){
                e.preventDefault();
                
                document.querySelector('div.errors-feedback').style.display = 'flex';

                document.querySelector('div.errors-feedback').innerHTML = '<ul></ul>'
    
                var listErrors = document.querySelector('div.errors-feedback ul');
                listErrors.style.background = 'rgba(255,255,255, 0.5)';
    
                for(var i = 0; i < errors.length; i++){
                    listErrors.innerHTML += "<li>" + " &raquo; " + errors[i] + '</li>';
                }
            }
    
        })
    };
});