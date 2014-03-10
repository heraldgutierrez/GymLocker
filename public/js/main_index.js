$(document).ready(function() {
	setPreviousWorkouts();
	setPlannedWorkouts();
	getExercisesOnDate();

	$('#btn-close-video').click(function() { $('#video_window').modal('hide'); });
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
		function(data){
			if(data.length != 0) {
				var exercises = data[0].exercises;

				$.each(exercises, function(i, exercise) {
					var tr = document.createElement('tr'),
						td_id = document.createElement('td'),
						td_name = document.createElement('td'),
						td_reps = document.createElement('td'),
						td_weight = document.createElement('td'),
						td_comment = document.createElement('td'),
						td_equip = document.createElement('td'),
						td_muscle = document.createElement('td'),
						td_video = document.createElement('td');
					var btn_video;

					td_name.innerHTML = exercise.name;
					tr.appendChild(td_name);

					td_reps.innerHTML = exercise.reps;
					tr.appendChild(td_reps);

					td_weight.innerHTML = exercise.weight;
					tr.appendChild(td_weight);

					td_muscle.innerHTML = exercise.muscle;
					tr.appendChild(td_muscle);

					td_equip.innerHTML = exercise.equip;
					tr.appendChild(td_equip);

					td_comment.innerHTML = exercise.comments;
					tr.appendChild(td_comment);

					if((exercise.video).length != 0) {
						btn_video = '<button class="btn btn-small" onclick="openVideo(\'' + exercise.name  + '\', \'' + exercise.video + '\');" >View Video</button>';
						td_video.innerHTML = '<td>' + btn_video + '</td>';
					}
					tr.appendChild(td_video);

					$('#body').append(tr);
				});
			} else {
				$('#noWorkout').show();
				$('#workout').hide();
			}
		}
	);
};

function openVideo(exercise, url) {
    var video = '';

    var token = url.split('?');
    var shorturl = token[1].substring(2, token[1].length);

    token = shorturl.split('&');
    video = token[0];
    
    $('#video-header').html(exercise);
    var embedCode = '<object><param id="param-movie" name="movie" value="http://www.youtube.com/v/' + video 
        + 'IHbY3blOGwc?version=3&amp;hl=en_US&amp;rel=0&amp;autoplay=1"></param>'
        + '<param name="allowFullScreen" value="true"></param>'
        + '<param name="allowscriptaccess" value="always"></param>'
        + '<embed id="embed-movie" src="http://www.youtube.com/v/' + video + '?version=3&amp;hl=en_US&amp;rel=0&amp;autoplay=1" type="application/x-shockwave-flash" width="550" height="315" allowscriptaccess="always" allowfullscreen="true"></embed>'
        + '</object>';
    $('#video-content').html(embedCode);
    $('#video_window').modal('show');
};