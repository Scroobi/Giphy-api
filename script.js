$(document).ready(function () {
   
    var cartoons = ['Avengers', 'Spirited Away', 'Dragonball Z', 'Robot Chicken', 'Teen Titans'];
    
    function displaycartoonInfo() {
          
        $('#cartoonsView').empty();
        var cartoon = $(this).attr('data-name');
        var numGifs = 3;
        

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dZ3DvkFrBrsASzC1EK3wYeA4yOHnTllQ" + "&limit=" + numGifs;
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating == "r" || results[i].rating == "pg-13") {
                    }
                    else {
                        
                        console.log(response)
                        var cartoonDiv = $('<div class="cartoon">');
                        var cartoonDiv = $('<div>').attr('class', 'cartoon');
                        var rating = results[i].rating;
                        var p = $('<p>').text("Rating: " + rating);
                        var cartoonImage = $('<img>');
                
                        cartoonImage.attr('src', results[i].images.fixed_height.url);
                        console.log(results[i].images.fixed_height.url);
                        cartoonDiv.append(p)
                        cartoonDiv.append(cartoonImage)
                        $('#cartoonsView').prepend(cartoonDiv);
          
                    }
                }

            });
    }
    $('.animalImage').on('click', function () {
        

        var state = $(this).attr('data-state');
        console.log(state);
        
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
        
    });
    

    function renderButtons() {
       
        $('#buttonsView').empty();
        
        for (var i = 0; i < cartoons.length; i++) {
            

            var a = $('<button>') 
            a.addClass('cartoon'); 
            a.attr('data-name', cartoons[i]); 
            a.text(cartoons[i]); 
            $('#buttonsView').append(a); 
        }
    }
    
    $('#addcartoon').on('click', function () {
        
        var cartoon = $('#cartoon-input').val().trim();
        
        cartoons.push(cartoon);

        
        renderButtons();
        
        return false;
    })
    
    $(document).on('click', '.cartoon', displaycartoonInfo);
    
    renderButtons();

})