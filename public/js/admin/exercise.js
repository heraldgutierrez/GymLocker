$(document).ready(function() {  
    $('#li_exercises').addClass('active');
    getAllExercises();

    $('#btn-select-all').click(function() { selectAll(true); });
    $('#btn-select-none').click(function() { selectAll(false); });
    $('#btn-remove-selected').click(function() {
        alert('Need to implement...');
    });
});

function getAllExercises() {
    $.getJSON(
        '/get_exercises',
        function(data){
            updateTable( data );
        }
    );
}

function updateTable(data) {
    var tr;
    var td_cb;
    var cb;
    var td_ex;
    var td_muscle;
    var td_equipment;
    var td_type;

    $.each(data, function(i, line) {
        tr = '<tr>';
        td_cb = '<td>';
        cb = '<input type="checkbox" name="exercises" onclick="checkboxClick();">';

        td_ex = '<td>' + line.name + '</td>';
        td_muscle = '<td>' + line.muscle + '</td>';
        td_equipment = '<td>' + line.equip + '</td>';
        td_type = '<td>' + line.exercise_type + '</td>';

        td_cb += cb + '</td>';
        tr += td_cb;
        tr += td_ex;
        tr += td_muscle;
        tr += td_equipment;
        tr += td_type;

        $('#tbl-body').append(tr);
    });
}

function selectAll(state) {
    if(state) {
        $('#btn-select-all').addClass('disabled');
        $('#btn-select-none').removeClass('disabled');
        $('#btn-remove-selected').removeClass('disabled');
        updateAllCheckboxes(state);
    } else {
        $('#btn-select-none').addClass('disabled');
        $('#btn-select-all').removeClass('disabled');
        $('#btn-remove-selected').addClass('disabled');
        updateAllCheckboxes(state);
    }
}

function updateAllCheckboxes(state) {
    var boxes = $('input[name="exercises"]');

    $.each(boxes, function(i, box) {
        box.checked = state;
    });
}

function checkboxClick() {
    var checked = $('input[name="exercises"]:checked').length;
    var total = $('input[name="exercises"]').length;
    if(checked == total) {
        selectAll(true);
    } else if (checked > 0) {
        $('#btn-select-all').removeClass('disabled');
        $('#btn-select-none').removeClass('disabled');
        $('#btn-delete-selected').removeClass('disabled');
    } else {
        selectAll(false);
    }
}

// document.addEventListener('DOMContentLoaded', function() {
//     var btnSelectAll = document.querySelector('#btn-select-all');
//     var btnSelectNone = document.querySelector('#btn-select-none');
//     var btnRemove = document.querySelector('#btn-remove_selected');
//     var table_body = document.querySelector('#tbl-body');
//     var btnModalCancel = document.querySelector('#btn-cancel-delete');
//     var btnModalDelete = document.querySelector('#btn-confirm-delete');
//     var exercisesToRemove;

//     function removeExercises ( exercisesToRemove ){
//         // go through each element and remove it from the DB
//         for (var i = exercisesToRemove.length - 1; i >= 0; i--) 
//         {
//             // alert("removing exercise " + exercisesToRemove[i].equipment);
//             $.getJSON('/remove_exercise', { "exercise_id" : exercisesToRemove[i].id }, function(wasSuccessful){
//                 // now reload the table
//             });
//         }
//     };

//     createDeleteTable = function(exercisesToRemove) {
//         var tableDelete = document.querySelector('#delete_body');
//         var header = document.querySelector('#delete_header');
    
//         header.innerHTML = "Delete the following exercises?";
//         tableDelete.innerHTML = "";

//         for (var i = 0; i < exercisesToRemove.length; i++) {
//             var tr = document.createElement('tr');
//             var td_name = document.createElement('td');
//             var td_muscle = document.createElement('td');
//             var td_equipment = document.createElement('td');
//             var td_type = document.createElement('td');

//             td_name.innerHTML = exercisesToRemove[i].value;
//             tr.appendChild(td_name);

//             td_muscle.innerHTML = exercisesToRemove[i].muscle;
//             tr.appendChild(td_muscle);

//             td_equipment.innerHTML = exercisesToRemove[i].equipment;
//             tr.appendChild(td_equipment);

//             td_type.innerHTML = exercisesToRemove[i].exercise_type;
//             tr.appendChild(td_type);

//             tableDelete.appendChild(tr);
//         };
//     };

//     btnRemove.addEventListener('click', function(){
//         // remove the selected equipment from the db
//         exercisesToRemove = document.querySelectorAll('input[name="exercises"]:checked');
//         if(!this.classList.contains('disabled')){
//             createDeleteTable(exercisesToRemove);
//             $("#delete_window").modal("show");
//         }
//     });

//     btnModalCancel.addEventListener('click', function(){
//         $("#delete_window").modal("hide");
//     });

//     btnModalDelete.addEventListener('click', function(){
//         removeExercises(exercisesToRemove);
//         $("#delete_window").modal("hide");

//         // reload table
//         $.getJSON(
//             '/get_exercises', function(data) {
//                 table_body.innerHTML = "";
//                 updateTable( data );
//             }
//         );
//     });
// })