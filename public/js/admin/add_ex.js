$(document).ready(function() {
    $('#li-add-exercise').addClass('active');

    getMuscleGroups();
    getEquipments();
    getExerciseTypes();
    
    $("#btn-add-exercise").click(function(){
        $("#already-exists-warning").html('');
        
        if($("#input-exercise-name").val().length == 0) {           
            $("#l-exercise-name").html('<span class="label label-important">Missing required field</span>');
        } else {
            add_exercise();
        }
    });
});

function getMuscleGroups() {
    $.getJSON("/get_muscle_groups", function(data) {
        var html = fill_select_box(data);
        $("#select-muscle-group").html(html);
    });
}

function getEquipments() {
    $.getJSON("/get_equipment", function(data) {
        var html = fill_select_box(data);
        $("#select-equipment").append(html);
    });
}

function getExerciseTypes() {
    $.getJSON("/get_exercise_types", function(data) {
        var html = fill_select_box(data);
        $("#select-exercise-type").html(html);
    });
}

function fill_select_box(data){
    var select_box;
    $.each(data, function(index, line){
        if(line.name == 'N/A') {
            select_box = '<option value="' + line.name +'">' + line.name + '</option>' + select_box;
        } else {
            select_box += '<option value="' + line.name +'">' + line.name + '</option>';
        }
    });
    return select_box;
}

function add_exercise( ){
    $.getJSON('/add_exercise', 
        { 
            "exercise_name" : $("#input-exercise-name").val(),
            "exercise_desc" : $("#input-exercise-desc").val(), 
            "video"         : $('#input-video').val(),
            "muscle_group"  : $("#select-muscle-group").val(), 
            "equipment"     : $("#select-equipment").val(), 
            "exercise_type" : $("#select-exercise-type").val() 
        }, 
        function(data) {
            if(data) {
            	$("#l-exercise-name").html('');

            	$("#input-exercise-name").val('');
            	$("#input-exercise-desc").val('');
                $('#input-video').val('');
            	$("#select-muscle-group").val(0).attr('selected', true);
            	$("#select-equipment").val(0).attr('selected', true);
            	$("#select-exercise-type").val(0).attr('selected', true);

            	$("#already-exists-warning").html('<span class="label label-success">Success! Exercise was added to the database.</span>');
            } else {
            	$("#l-exercise-name").html('');
             	$("#already-exists-warning").html('<span id="error" class="label label-important">Woops! That exercise already exists in the database.</span>');
            }
        }
    );
}