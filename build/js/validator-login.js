window.addEventListener('load', function(){
 
    var userLoginForm = document.querySelector('form.user-login-form'); 
    
    userLoginForm.addEventListener('submit', function(e){
        var errors = [];

        var emailInput = document.querySelector('.email');
        var passwordInput = document.querySelector('.password');

    
        if(emailInput.value == ''){
            errors.push('Ingresá tu e-mail para acceder a tu cuenta.');
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
            
        };
        
        
        



        })

   
});