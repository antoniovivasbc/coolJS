$("#search-task").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#task-tbody tr").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    })
})
$('#new-task').on('click', function(){
    $('#exampleModal').modal('hide');
    $('#exampleModal2').modal('show');
})
//New task create
$('#task-form').submit(function(){
    $('#exampleModal').modal('show');
    $('#exampleModal2').modal('hide');
    var taskName = $('#task-name').val();
    var deadline = $('#deadline').val();
    var index = $('#task-tbody tr').length + 1;
    $('#task-tbody').append(
        "<tr>"+
            "<th>"+index+"</th>"+
            "<td >"+taskName+"</td>"+
            "<td>"+deadline+"</td>"+
            "<td><button class='btn btn-success complete-btn'>Complete</button><button class='btn btn-danger delete-btn'>Delete</button><button class='btn btn-info' style='color: white;'>Edit</button></td>"+
        "</tr>"
    );
    $('#task-form input').each(function(){
        $(this).val('');
    })
})
