var field_id = 0;

$(document).ready(function() {
	$('#workout-dropdown').addClass('active');
	$('#modal-delete').modal('hide');
	$('.carousel').carousel({ interval : 10000 });
	$('#btn-help').tooltip({ 
		trigger : 'hover',
		placement : 'left'
	});

	$('#btn-create-wo').addClass('active');

	$('#datepicker').datepicker();
	formatDatePicker();
	

	setSettings();
	checkForExistingWorkout($('#datepicker').val());	// Check to see if there is an existing workout for today

	$('#tbl-workout tbody').sortable({
		helper: function(e, ui) {
			ui.children().each(function() {
				$(this).width($(this).width());
			});
			return ui;
		},
		containment: 'parent',
		forcePlaceholderSize: true,
		scroll: true
	}).disableSelection();

	$('#datepicker').on('change', function() { checkForExistingWorkout( $(this).val() ); });

	$('#btn-save').click(function() { 
		if(!$(this).hasClass('disabled'))
			saveWorkout(); 
	});

	$('#btn-delete').click(function() { 
		if(!$(this).hasClass('disabled'))
			$('#modal-delete').modal('show'); 
	});

	$('#btn-modal-close').click(function() { $('#modal-delete').modal('hide'); });
	$('#btn-modal-delete').click(function() { deleteWorkout($('#datepicker').val()); });

	$('#btn-help').click(function() {
		$('#content-help').show();
		$('#content-main').hide();
	});

	$('#btn-close-help').click(function() {
		$('#content-help').hide();
		$('#content-main').show();
	});

	$('#disable-help').change(function() {
		saveHelpPreference($(this).is(':checked'));
	});
});

function formatDatePicker() {
	var date = $('#datepicker').val();
	var token = date.split('/');
	var month = token[0];
	var day = token[1];
	var year = token[2];

	month = (month < 10 && month.length < 2) ? '0' + month : month;
	day = day < 10 ? '0' + day : day;

	var today = month + '/' + day + '/' + year;
	$('#datepicker').val(today);
}

function setSettings() {
    $.getJSON(
        '/get_settings',
        function(data){
            if(data.create_help) {
                $('#content-help').show();
		        $('#content-main').hide();
		    } else {
		        $('#disable-help').attr('checked', true);
            }
        }
    );
}

function checkForExistingWorkout(date) {
	$.getJSON(
		'/fitness/check_existing_workout',
		{ 
			'date' : date
		}, 
		function(data){
			if( data.length > 0 ) { 
				createExistingTable(data); 
			} else {
				$("#tbl-workout tbody").find('tr').remove();
			}
		}
	);
}

function createExistingTable(data) {
	$('#tbl-workout tbody').html('');
	$('#btn-save, #btn-delete').removeClass('disabled');
	var exercises = data[0].exercises;
	$.each(exercises, function(i, ex) {
		createSetForm(ex);
	});
}

function deleteWorkout(date) {
	$.ajax({
		type 	: 'post',
		data 	: { 'date' : date },
		url  	: '/fitness/delete_workout',
		success : function(data) {
			$('#modal-delete').modal('hide');
			$('#btn-save, #btn-delete').addClass('disabled');
			$('#tbl-workout tbody').html('');
			$('#delete-container').show().delay(5000).fadeOut();
		}
	});
}

function saveWorkout() {
	$('#numExs').val($('#tbl-workout tbody').children().length);
	var exs = generateData();

	$.ajax({
		type	: 'post',
		url 	: '/fitness/save_workout',
		data 	: {
			date 	: $('#datepicker').val(),
			exs 	: exs
		},
		success : function() {
			$('#btn-delete').removeClass('disabled');
			$('#success-container').show().delay(5000).fadeOut();
		}
	});
}

function generateData() {
	var children = $('#tbl-workout tbody').children();
	var exs = [];

	var id;
	var reps;
	var weight;
	var comment;

	$.each(children, function(i, val) {
		id = $(this).children().children('[name="ex_id"]').val();
		reps = $(this).children().children('[name="ex_reps"]').val();
		weight = $(this).children().children('[name="ex_weight"]').val();
		comment = $(this).children().children('[name="ex_com"]').val();

		exs.push({
			id : id,
			reps : reps,
			weight : weight,
			comment : comment
		})
	});

	return exs;
}

function saveHelpPreference( show ) {
    $.ajax({
        type:   "POST",
        url:    "/save_preference",
        data:   {
            type : 'create_help',
            show : !show
        },
        success: function(data) { }
    });
};

function resultClicked(ex) {
	createSetForm(ex);
	$('#btn-save').removeClass('disabled');
}

function createSetForm(ex) {
	var tr = '<tr class="form-horizontal">';

	// Drag
	var td_drag = '<td>';
	var i = '<i class="icon-resize-vertical">';
	td_drag += i + '</td>';
	tr += td_drag;

	var td_name = '<td class="ex-name">'
	td_name += ex.name;
	// var ex_id = '<input type="hidden" name="ex_id_' + field_id + '" value="' + ex._id + '" />';
	var ex_id = '<input type="hidden" name="ex_id" value="' + ex._id + '" />';
	td_name += ex_id;
	td_name += '</td>';
	tr += td_name;

	var td_bp = '<td class="ex-bp">';
	td_bp += ex.muscle;
	td_bp += '</td>';
	tr += td_bp;

	var td_equip = '<td class="ex-bp">';
	td_equip += ex.equip;
	td_equip += '</td>';
	tr += td_equip;

	var td_reps = '<td>';
	// var input_reps = '<input type="number" class="ex-number-input" name="ex_reps_' + field_id + '" min="0" placeholder="reps" value="' + ex.reps + '" />';
	var input_reps = '<input type="number" class="ex-number-input" name="ex_reps" min="0" placeholder="reps" value="' + ex.reps + '" />';
	td_reps += input_reps;
	td_reps += '</td>';
	tr += td_reps;

	var td_weight = '<td>';
	// var input_weight = '<input type="number" class="ex-number-input" name="ex_weight_' + field_id + '" min="0" placeholder="weight" value="' + ex.weight + '" />';
	var input_weight = '<input type="number" class="ex-number-input" name="ex_weight" min="0" placeholder="weight" value="' + ex.weight + '" />';
	td_weight += input_weight;
	td_weight += '</td>';
	tr += td_weight;

	var td_comm = '<td>';
	var comm_text = ex.comments ? ex.comments : '';
	// var comm = '<input type="textarea" name="ex_com_' + field_id + '" placeholder="Comments" value="' + comm_text + '" />';
	var comm = '<input type="textarea" name="ex_com" placeholder="Comments" value="' + comm_text + '" />';
	td_comm += comm;
	td_comm += '</td>';
	tr += td_comm;

	var td_del = '<td><button class="btn btn-danger btn-delete"><i class="icon-remove icon-white"></i></button></td>';
	tr += td_del;

	$('#tbl-workout tbody').append(tr);

	$('.icon-resize-vertical').hover(function() {
		$(this).css('cursor', 'move');
	});

	$('.btn-delete').hover(function() {
		$(this).css('cursor', 'pointer');
	}).click(function() {
		$(this).parent().parent().fadeOut(4000).remove();

		if($('.icon-resize-vertical').length == 0) {
			$('#btn-save').addClass('disabled');
		}
	});

	field_id++;
}