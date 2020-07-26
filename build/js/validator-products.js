  
window.addEventListener('load', function() {
   console.log ("Hola mundo")
    var productAddForm = document.querySelector('form.adminCreateProduct');
    var productEditForm = document.querySelector('form.adminEditProduct');
    
   // var imagen1 = document.querySelector('.imagen1');

    if(productAddForm){
        var form = productAddForm;
    }
    else{
        if(productEditForm) {
            var form = productEditForm;
        }
    }
    
    form.addEventListener('submit', function(e) {
        var errors = [];
        var productName = document.querySelector('.new_title');
        var Key = document.querySelector('.Key');
        var releaseDate = document.querySelector('.releaseDate');
        var rating = document.querySelector('.rating');
        var metacritic = document.querySelector('.metacritic');
        var Plataforma = document.querySelector('.Plataforma');
        var about = document.querySelector('.about');
        var requirements_min = document.querySelector('.requirements_min');
        var requirements_rec = document.querySelector('.requirements_rec');
        var categories = document.querySelector('.categories');
        var price = document.querySelector('.price');  
        var discount = document.querySelector('.discount');
        var game_trailer = document.querySelector('.game_trailer');
        var game_gameplay = document.querySelector('.game_gameplay');
        var game_review = document.querySelector('.game_review');

       

       // console.log(productName.value.length );
       // console.log(description.value.length);
        
        if(productName.value == "" || productName.value.length < 3) {
            errors.push("Debe ingresar un título con al menos 5 caracteres");
        }

        if(Key.value == ""){
            errors.push("Debe ingresar un código para el producto");
        }

        if(releaseDate.value == ""){
            errors.push("Debe ingresar el una fecha");
        }

        if(rating.value == ""){
            errors.push("Debe ingresar un un rating");
        }

        if(metacritic.value == ""){
            errors.push("Debe ingresar un el rating de Metacritic");
        }

        if(Plataforma.value == ""){
            errors.push("Debe seleccionar una plataforma");
        }

        if(about.value == "" || about.value.length < 20) {
            errors.push("Debe ingresar una descripción con al menos 20 caracteres");
        }

        if(requirements_min.value == ""){
            errors.push("Debe ingresar los requerimientos minimos");
        }

        if(requirements_rec.value == ""){
            errors.push("Debe ingresar los requerimientos recomendados");
        }

        if(price.value == "") {
            errors.push("Debe ingresar el precio del juego");
        }

        if(discount.value == ""){
            errors.push("Debe ingresar el descuento a aplicar");
        }

        if(game_trailer.value == ""){
            errors.push("Debe ingresar el link al trailer del juego");
        }

        if(game_gameplay.value == ""){
            errors.push("Debe ingresar el link al gameplay del juego");
        }

        if(game_review.value == ""){
            errors.push("Debe ingresar el link a la reseña del juego");
        }


        if(errors.length > 0){
            e.preventDefault();
            
            document.querySelector('div.errors-feedback').style.display = 'flex';

            document.querySelector('div.errors-feedback').innerHTML = '<ul></ul>'

            let listErrors = document.querySelector('div.errors-feedback ul');
            listErrors.style.background = 'rgba(255,255,255, 0.5)';

            for(var i = 0; i < errors.length; i++){
                listErrors.innerHTML += "<li>" + " &raquo; " + errors[i] + '</li>';
            }
        }
    }) 
})
