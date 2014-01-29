$(document).ready(function() {
    $('#li-equipment').addClass('active');

    getAllEquipment();

    $('#btn-select-all').click(function() { selectAll(true); });
    $('#btn-select-none').click(function() { selectAll(false); });
    $('#btn-delete-selected').click(function() {
        alert('Need to implement...');
        // if(!$(this).hasClass('disabled')) {
        //     createDeleteTable();
        //     $("#delete_window").modal("show");
        // } else {
        //     var cb = $('input[name="username"]');
        //     $.each(cb, function(i, c) {
        //         alert($(c).siblings('input[name="reg-now"]').is(':checked'));

        //     });
        // }
    });
});

function getAllEquipment() {
    $.getJSON(
        '/get_equipment',
        function(data){
            updateTable( data );
        }
    );
}

function updateTable(data) {
    var check;
    var firstTd;
    var row;
    var equip;
    var body = '';

    $.each(data, function(i, eq) {
        row = '<tr>';
        firstTd = '<td>';
        check = '<input type="checkbox" name="reg-now" onclick="checkboxClick();">';
        check += '<input type="hidden" name="id" value="' + eq._id + '">';
        check += '<input type="hidden" name="name" value="' + eq.name + '">';
        equip = '<td>' + eq.name + '</td>';

        firstTd += check + '</td>';
        row += firstTd;
        row += equip;
        row += '</tr>';

        $('#tbl-body').append(row);
    });
}

function updateAllCheckboxes(state) {
    var boxes = $('input[name="reg-now"]');

    $.each(boxes, function(i, box) {
        box.checked = state;
    });
}

function selectAll(state) {
    if(state) {
        $('#btn-select-all').addClass('disabled');
        $('#btn-select-none').removeClass('disabled');
        $('#btn-delete-selected').removeClass('disabled');
        updateAllCheckboxes(state);
    } else {
        $('#btn-select-none').addClass('disabled');
        $('#btn-select-all').removeClass('disabled');
        $('#btn-delete-selected').addClass('disabled');
        updateAllCheckboxes(state);
    }
}

function checkboxClick() {
    var checked = $('input[name="reg-now"]:checked').length;
    var total = $('input[name="reg-now"]').length;
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
//     var equipmentToRemove;

//     function removeEquipment( equipmentToRemove ){
//         // go through each element and remove it from the DB
//         for (var i = 0; i < equipmentToRemove.length; i++) {
//             var id = equipmentToRemove[i].id;
//             $.getJSON('/remove_equipment', { "equipment_id" : equipmentToRemove[i].id }, function(wasSuccessful){});
//         }
//     };

//     createDeleteTable = function(equipmentToRemove) {
//         var tableDelete = document.querySelector('#delete_body');
//         var header = document.querySelector('#delete_header');
    
//         header.innerHTML = "Delete the following equipment?";
//         tableDelete.innerHTML = "";

//         for (var i = 0; i < equipmentToRemove.length; i++) {
//             var tr = document.createElement('tr');
//             var td_id = document.createElement('td');
//             var td_name = document.createElement('td'); // equipment name field

//             td_name.innerHTML = equipmentToRemove[i].value;
//             tr.appendChild(td_name);
//             tableDelete.appendChild(tr);
//         };
//     };

//     btnRemove.addEventListener('click', function(){
//         // remove the selected equipment from the db
//         equipmentToRemove = document.querySelectorAll('input[name="equipment"]:checked');
//         if(!this.classList.contains('disabled')){
//             createDeleteTable(equipmentToRemove);
//             $("#delete_window").modal("show");
//         }
//     });

//     btnModalCancel.addEventListener('click', function(){
//         $("#delete_window").modal("hide");
//     });


//     btnModalDelete.addEventListener('click', function(){
//         removeEquipment(equipmentToRemove);
//         $("#delete_window").modal("hide");

//         // reload table
//         $.getJSON(
//             '/get_equipment', function(data) {
//                 table_body.innerHTML = "";
//                 updateTable( data );
//             }
//         );
//     });
// })