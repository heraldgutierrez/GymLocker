$(document).ready(function() {
    $('#li-ex-library').addClass('active');
    $('.carousel').carousel({ interval: 10000 });
    $("#btn-help").tooltip({trigger: 'hover', placement: 'bottom'});

    setSettings();
    getAllWorkouts();

    $('#btn-help').click(function() { openHelp(); });
    $('#btn-close-help').click(function() { closeHelp(); });
    $('#btn-close-video').click(function() { $('#video_window').modal('hide'); });

    $('#switch_diagram').change(function() {
        if($(this).is(':checked')) {
            $('#male_diagram').hide();
            $('#female_diagram').show();
            savePreference(true);
        } else {
            $('#male_diagram').show();
            $('#female_diagram').hide();
            savePreference(false);
        }
    });

    $('#disable_help').change(function() {
        saveHelpPreference($(this).is(':checked'));
    });

    $('#searchOptions li a, .map_area').hover(
        function mouseOver() {
            $('#ex-title').html($(this).attr('data-muscle'));
            if($('#switch_diagram').is(':checked')) {
                $('#female_muscles').attr('src', '/img/female/female_muscles_' + ($(this).attr('data-muscle')).toLowerCase() + '.png');
            } else {
                $('#muscles').attr('src', '/img/male/muscles_' + ($(this).attr('data-muscle')).toLowerCase() + '.png');
            }
        },
        function mouseOut() {
            $('#ex-title').html(' &nbsp; ');
            if($('#switch_diagram').is(':checked')) {
                $('#female_muscles').attr('src', '/img/female/female_muscles.png');
            } else {
                $('#muscles').attr('src', '/img/male/muscles.png');
            }
        }
    ).click(function(){
        getExercises($(this).attr('data-muscle'));
    });

    $('#datepicker').datepicker();

    $('#btn-close-workout').click(function() {
        $('#workout-window').modal('hide');
        $('#select-date').val(0);
    });

    $('#btn-add-workout').click(function() {
        if ($('#select-date').val() == 0) {
            formatDatePicker();
            $('#btn-add-workout').hide();
            $('#btn-create-workout').show();

            $('#add-date').hide();
            $('#create-date').show();
        } else {
            saveWorkout($('#select-date').val(), $('#add-exercise').val(), $('#add-reps').val(), $('#add-weight').val(), $('#add-comment').val() );
        }
    });

    $('#btn-create-workout').click(function() {
        saveWorkout($('#datepicker').val(), $('#add-exercise').val(), $('#add-reps').val(), $('#add-weight').val(), $('#add-comment').val() );
        reloadWorkouts();
    });
});

function setSettings() {
    $.getJSON(
        '/get_settings',
        function(data){
            if(data.diagram) {
                $('#switch_diagram').attr('checked', true);
                $('#male_diagram').hide();
                $('#female_diagram').show();
            }

            if(data.exercise_help) {
                $('#content-help').show();
                $('#content-main').hide();
            } else {
                $('#disable_help').attr('checked', true);
            }
        }
    );
}

function openHelp() {
    $('.item').removeClass('active');
    $('#first-item').addClass('active');
    $('#content-help').show();
    $('#content-main').hide();
}

function closeHelp() {
    $('#content-help').hide();
    $('#content-main').show();
}

function savePreference( gender ) {
    $.ajax({
        type:   "POST",
        url:    "/save_preference",
        data:   {
            type    : 'diagram',
            show    : gender
        },
        success: function(data) {
        }
    });
};

function saveHelpPreference( show ) {
    $.ajax({
        type:   "POST",
        url:    "/save_preference",
        data:   {
            type : 'exercise_help',
            show : !show
        },
        success: function(data) { }
    });
};

function getExercises(musclePart) {
    $.getJSON(
        '/get_exercises_by_muscle', 
        { muscle : musclePart }, 
        function(data) {
            fillResultTable(data, musclePart);
        }
    );
}

function fillResultTable(data, term) {
    var searchTableBody = $('#search_body');
    var emptyContainer = $('#emptyContainer');
    var fullContainer = $('#fullContainer');

    $('#nav-muscle').removeClass('active');
    $('#content-muscles').removeClass('active');
    $('#nav-results').addClass('active');
    $('#content-results').addClass('active');

    $('#search_body').html('');
    $.each(data, function(i, line){
        var tr = '<tr>';
        var td_name = '<td>' + line.name + '</td>';
        var td_desc = '<td>' + line.description + '</td>';
        var td_muscle = '<td>' + line.muscle + '</td>';
        var td_equip = '<td>' + line.equip + '</td>';
        var td_exType = '<td>' + line.exercise_type + '</td>';
        var td_view = '<td></td>';
        var td_workout;

        var btn_video;
        var btn_add;

        tr += td_name;
        tr += td_desc;
        tr += td_muscle;
        tr += td_equip;
        tr += td_exType;

        if((line.video).length != 0) {
            btn_video = '<button class="btn btn-small" onclick="openVideo(\'' + line.name  + '\', \'' + line.video + '\');" >Example Video</button>';
            td_view = '<td>' + btn_video + '</td>';
        }
        tr += td_view;

        btn_add = '<button class="btn btn-small" onclick="addToWorkout(\'' + line._id + '\', \'' + line.name + '\', \'' + line.muscle + '\')" >Add to a Workout</button>';
        td_workout = '<td>' + btn_add + '</td>';
        tr += td_workout;

        searchTableBody.append(tr);
    });

    $('#exercise_header').html('Exercises for ' + term + ':');

    if(data.length === 0) {
        emptyContainer.html('<center><h3>Currently no exercises for ' + term + '</h3></center>');
        emptyContainer.show();
        fullContainer.hide();
    } else {
        emptyContainer.hide();
        fullContainer.show();
    }
}

function getAllWorkouts() {
    $.getJSON(
        '/fitness/get_planned_workouts', 
        function(data) {
            $.each(data, function(i, line) {
                var option = document.createElement('option');

                option.value = line.date;
                option.innerHTML = line.date;
                $('#select-date').append(option);
            });
        }
    );
}

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
}

function addToWorkout(id, name, muscle) {
    $('#workout-header').html('Adding "' + name + '" to a workout.');
    $('#add-exercise').val(id);
    $('#add-reps').val(0);
    $('#add-weight').val(0);

    $('#btn-add-workout').show();
    $('#btn-create-workout').hide();

    $('#add-date').show();
    $('#create-date').hide();
    $('#workout-window').modal('show');
}

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

function reloadWorkouts() {
    $('#select-date').empty();

    var option = document.createElement('option');
    option.value = '0';
    option.setAttribute('selected', true);
    option.innerHTML = '- Create a new workout -';
    
    $('#select-date').append(option);
    getAllWorkouts();
}

function saveWorkout(date, exercise, reps, weight, comment) {
    var id = $('#add-exercise').val();
    var ex = {
            id : id,
            reps : reps,
            weight : weight,
            comment : comment
        };

    $.ajax({
        type:   'post',
        url:    '/fitness/add_to_existing_workout',
        data:       
        {
            'date'  : date,
            'exercise'   : ex
        },
        success:    function() {
                $('#workout-window').modal('hide');
                $('#select-date').val(0);
            },
    });
}

function resultClicked(ex) {
    fillResultTable([ex], ex.name);
    $('#exercise_header').html('Details for: ' + ex.name);
}



