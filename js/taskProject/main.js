var inputTaskName = $('#task-name');
var inputDeadline = $('#deadline');
var modalTasks = $('#exampleModal');
var modalCreateTask = $('#exampleModal2');
$("#search-task").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#task-tbody tr").each(function(){
        $(this).children().eq(1).filter(function(){
            $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1);
        })
    })
})
//New task create
$('#new-task').on('click', function(){
    modalTasks.modal('hide');
    modalCreateTask.modal('show');
    inputTaskName.attr('data-index', '0');
    inputTaskName.val('');
    inputDeadline.val('');
})
//Form submit (new task or edit task)
$('#task-form').submit(function(){
    modalTasks.modal('show');
    modalCreateTask.modal('hide');
    index = inputTaskName.attr('data-index');
    taskName = inputTaskName.val();
    deadline = inputDeadline.val();
    if(index > 0){
        //Edit
        var taskRow = $('#task-tbody').children().eq(index - 1);
        taskRow.children().eq(1).text(taskName);
        taskRow.children().eq(2).text(deadline);
    }else{
        //New task
        index = $('#task-tbody tr').length + 1;
        $('#task-tbody').append(
            "<tr>"+
                "<th>"+index+"</th>"+
                "<td >"+taskName+"</td>"+
                "<td>"+deadline+"</td>"+
                "<td><button class='btn btn-success complete-btn'><img src='img/verifica.png' alt=''></button><button class='btn btn-danger delete-btn'><img src='img/lata-de-lixo.png' alt=''></button><button class='btn btn-info edit-btn' style='color: white;'><img src='img/editar.png' alt=''></button></td>"+
            "</tr>"
        );
        completeTask();
        deleteTask();
        editTask();
    }
})
//Task actions
function completeTask(){
    $('.complete-btn').each(function(){
        $(this).on('click', function(){
            $(this).parents().eq(1).remove();
            alert('Nice work!!');
    
        })
    });
}
function deleteTask(){
    $('.delete-btn').each(function(){
        $(this).on('click', function(){
            $(this).parents().eq(1).remove();
            alert('Task removed!');
    
        })
    });
}
function editTask(){
    $('.edit-btn').each(function(i){
        $(this).on('click', function(){
            modalTasks.modal('hide');
            modalCreateTask.modal('show');
            $('#exampleModalLabel2').text('Edit task');
            var index = $('#task-tbody tr').eq(i).children().eq(0).text();
            var taskName = $('#task-tbody tr').eq(i).children().eq(1).text();
            var deadline = $('#task-tbody tr').eq(i).children().eq(2).text();
            inputTaskName.val(taskName);
            inputDeadline.val(deadline);
            inputTaskName.attr('data-index', index);
        })
    });
}
completeTask();
deleteTask();
editTask();