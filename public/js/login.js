$(document).ready(function() {
    $("#btn-demo").popover({placement:'bottom'});

    var query = queryStr('warning');
    if(query == null)
        $('#warning').hide();
    else if(query == 'usernameExists')
        showUsernameWarning();
    else if(query == 'verifyPassword')
        showPasswordWarning();
    else if(query == 'incorrectLogin')
        showLoginWarning();


    $('#warning-close').click(function() {
        $('#warning').hide();
    });    
});

function queryStr(val) {
    var query = window.location.search.substring(1);
    var params = query.split('&');
    var value = null;
    var pair;

    for (var i = 0; i < params.length; i++) {
        pair = params[i].split('=');
        if(pair[0] == val)
            value = pair[1];
    }
    
    return value;
}

function showLoginWarning() {
    var warning = "<strong>Warning:</strong> Incorrect username or password.";
    $('#warning div').html(warning);
}

function showPasswordWarning() {
    var warning = "<strong>Warning:</strong> Problem signing up, password and verify password doesn't match.";
    $('#warning div').html(warning);
}

function showUsernameWarning() {
    var warning = "<strong>Warning:</strong> Problem signing up, username already exists.";
    $('#warning div').html(warning);
}