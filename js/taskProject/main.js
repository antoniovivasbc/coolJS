var inputTaskName = $('#task-name');
var inputDeadline = $('#deadline');
var modalTasks = $('#exampleModal');
var modalCreateTask = $('#exampleModal2');
var tBody = $('#task-tbody');
var tRow = $('#task-tbody tr');
var taskOnDrag;
var taskUnder;
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
    tRow = $('#task-tbody tr');
    modalTasks.modal('show');
    modalCreateTask.modal('hide');
    index = inputTaskName.attr('data-index');
    taskName = inputTaskName.val();
    deadline = inputDeadline.val();
    if(index > 0){
        //Edit
        tRow = tBody.children().eq(index - 1);
        tRow.children().eq(1).text(taskName);
        tRow.children().eq(2).text(deadline);
    }else{
        //New task
        index = tRow.length + 1;
        tBody.append(
            "<tr draggable = 'true'>"+
                "<th>"+index+"</th>"+
                "<td >"+taskName+"</td>"+
                "<td>"+deadline+"</td>"+
                "<td><button  draggable = 'false' class='btn btn-success complete-btn'><img src='img/verifica.png' alt=''></button><button draggable = 'false' class='btn btn-danger delete-btn'><img src='img/lata-de-lixo.png' alt=''></button><button draggable = 'false' class='btn btn-info edit-btn' style='color: white;'><img src='img/editar.png' alt=''></button></td>"+
            "</tr>"
        );
        completeTask();
        deleteTask();
        editTask();
    }
})
//Task actions
function completeTask(){
    $('#task-tbody tr:last-child .complete-btn').on('click', function(){
        $(this).parents().eq(1).remove();
        alert('Nice work!!');
        $('#task-tbody tr').each(function (index) {
            $(this).find('th:first').text(index + 1);
        });
    })

}
function deleteTask(){
    $('#task-tbody tr:last-child .delete-btn').on('click', function(){
        $(this).parents().eq(1).remove();
        alert('Task deleted!');
        $('#task-tbody tr').each(function (index) {
            $(this).find('th:first').text(index + 1);
        });
    })
    $('#task-tbody tr').each(function (index) {
        $(this).find('th:first').text(index + 1);
    });
}
function editTask(){
    tRow = $('#task-tbody tr');
    $('.edit-btn').each(function(i){
        $(this).on('click', function(){
            modalTasks.modal('hide');
            modalCreateTask.modal('show');
            $('#exampleModalLabel2').text('Edit task');
            var index = tRow.eq(i).children().eq(0).text();
            var taskName = tRow.eq(i).children().eq(1).text();
            var deadline = tRow.eq(i).children().eq(2).text();
            inputTaskName.val(taskName);
            inputDeadline.val(deadline);
            inputTaskName.attr('data-index', index);
        })
    });
}
completeTask();
deleteTask();
editTask();
//Drag and drop
function dragStart (event){
    taskOnDrag = $(event.target);
}
function dragOver(event){
    taskUnder = $(event.target.parentNode);
    event.preventDefault();
}
tBody.on('dragstart', dragStart);
tBody.on('dragover', dragOver);
tBody.on('drop', function drop (){
    var index1 = taskOnDrag.children().eq(0);
    var index2 = taskUnder.children().eq(0);
    if(index1.text() < index2.text()){
        $(taskOnDrag).insertAfter(taskUnder);
    }else{
        $(taskOnDrag).insertBefore(taskUnder);
    }
    $('#task-tbody tr').each(function (index) {
        $(this).find('th:first').text(index + 1);
    });
});

