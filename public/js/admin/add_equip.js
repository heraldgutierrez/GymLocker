$(document).ready(function() {
    $('#li-add-equipment').addClass('active');

    $("#btn-add-equipment").click(function(){
        $("#already-exists-warning").html('');
        
        if($("#input-equipment-name").val().length == 0) {           
            $("#l-equipment-name").html('<span class="label label-important">Missing required field</span>');
        } else {
            add_equipment();
        }
    });
});

function add_equipment(){
    $.getJSON('/add_equipment', 
        { "equipment" : $("#input-equipment-name").val() }, 
        function(data) {
            $("#l-equipment-name").html('');

            if(data) {
                $("#input-equipment-name").val('');
                $("#already-exists-warning").html('<span class="label label-success">Success! Equipment added to the database.</span>');
            } else {
                $("#already-exists-warning").html('<span id="error" class="label label-important">Woops! That exercise already exists in the database.</span>');
            }
        }
    );
}