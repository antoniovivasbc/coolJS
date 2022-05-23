$('.form-inactive').each(function(){
    $(this).submit(function(e){
        e.preventDefault();
    })
})
