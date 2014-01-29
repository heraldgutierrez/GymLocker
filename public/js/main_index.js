$(document).ready(function() {
	setPreviousWorkouts();
	setPlannedWorkouts();
	getExercisesOnDate();
});

function setPreviousWorkouts(){
	$.getJSON(
		'/fitness/get_previous_workouts',
		function(data){
			$('#workouts-completed').text(data);
		});
};

function setPlannedWorkouts(){
	$.getJSON(
		'/fitness/get_planned_workouts',
		function(data){
			$('#workouts-planned').text(data);
		});
};

function getExercisesOnDate() {
    var userId = $('#user_id').val();

    $.getJSON(
        '/fitness/check_existing_workout', 
        { }, 
        function(data){
            if(data.length != 0) {
                // var tr,
                //     td_id,
                //     td_name,
                //     td_reps,
                //     td_weight,
                //     td_comment,
                //     td_equip,
                //     td_muscle;
                    
                $.each(data, function(i, line) {
                    var tr = document.createElement('tr'),
                        td_id = document.createElement('td'),
                        td_name = document.createElement('td'),
                        td_reps = document.createElement('td'),
                        td_weight = document.createElement('td'),
                        td_comment = document.createElement('td'),
                        td_equip = document.createElement('td'),
                        td_muscle = document.createElement('td');

                    td_name.innerHTML = line.exercise;
                    tr.appendChild(td_name);

                    td_reps.innerHTML = line.reps;
                    tr.appendChild(td_reps);

                    td_weight.innerHTML = line.weight;
                    tr.appendChild(td_weight);

                    td_muscle.innerHTML = line.muscle;
                    tr.appendChild(td_muscle);

                    td_equip.innerHTML = line.equipment;
                    tr.appendChild(td_equip);

                    td_comment.innerHTML = line.comments;
                    tr.appendChild(td_comment);

                    $('#body').append(tr);
                });
            } else {
    			$('#noWorkout').show();
    			$('#workout').hide();
    		}
    });
};