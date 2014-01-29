$(document).ready(function() {
	$('#li-users').addClass('active');
	getAllMembers();

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

	$('#btn-confirm-delete').click(function() {
		alert('Deleting...');
	}); 

	$('#btn-cancel-delete').click(function() {
		alert('Cancel');
	});
});

function getAllMembers() {
	$.getJSON(
		'/get_all_members',
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(members) {
    var check;
    var firstTd;
    var row;
    var username;
    var role;
    var body = '';

    $.each(members, function(i, user) {
    	row = '<tr>';
    	firstTd = '<td>';
        check = '<input type="checkbox" name="reg-now" onclick="checkboxClick();">';
        check += '<input type="hidden" name="username" value="' + user.username + '">';
        check += '<input type="hidden" name="role" value="' + user.role + '">';
        username = '<td>' + user.username + '</td>';
        role = '<td>' + user.role + '</td>';

        firstTd += check + '</td>';
        row += firstTd;
        row += username;
        row += role;
        row += '</tr>';

        $('#members_body').append(row);
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

function createDeleteTable() {
    var header = $('#delete_header');
    var tableDelete = $('#delete_body');
    var cbos = $('input[name="reg-now"]:checked');
    var usernames = $('input[name="username"]');

    if (cbos.length == 1) 
        header.html("Delete this member?")
    else 
        header.html("Delete the following members?")

    tableDelete.html('');

    $.each(usernames, function(i, user) {
        if($(user).siblings('input[name="reg-now"]').is(':checked')) {
            var tr = '<tr>';
            var td_name = '<td>' + $(user).val() + '</td>';
            var td_role = '<td>' + $(user).siblings('input[name="role"]').val() + '</td>';

            tr += td_name;
            tr += td_role;
            tr += '</tr>';

            tableDelete.append(tr);
        }
    });
}