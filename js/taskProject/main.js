$("#search-task").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#task-tbody tr").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    })
})