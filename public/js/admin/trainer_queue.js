$(document).ready(function() {
    $('#li-pro-queue').addClass('active');
});

function getProQueue() {
    $.getJSON(
        '/get_pro_queue',
        function(data) {
            updateTable( data );
        }
    );
}

// 	function updateTable(data) {
//      var tableMemebers = document.querySelector('#proBody');
//      $.each(data, function(i, line){
//          var tr = document.createElement('tr'),
//              td_cb = document.createElement('td'),       // checkbox field
//              td_first = document.createElement('td'),    // first name field
//              td_last = document.createElement('td'),     // last name field
//              td_login = document.createElement('td'),    // login name field
//              td_email = document.createElement('td');    // email field
//          var cb = document.createElement('input'),       // checkbox element
//              ids = document.createElement('input'),      // ids element
//              fnames = document.createElement('input'),   // fnames element
//              lnames = document.createElement('input'),   // lnames element
//              logins = document.createElement('input'),   // logins element
//              emails = document.createElement('input');   // emails element

//          cb.type = "checkbox";
//          cb.name = "reg-now";
//          cb.value = i;
//          cb.addEventListener('click', function(){ updateCboClick(); }, false);
//          td_cb.appendChild(cb);

//          ids.type = "hidden";
//          ids.name = "ids";
//          ids.value = line.id;
//          td_cb.appendChild(ids);

//          fnames.type = "hidden";
//          fnames.name = "fnames";
//          fnames.value = line.fname;
//          td_cb.appendChild(fnames);

//          lnames.type = "hidden";
//          lnames.name = "lnames";
//          lnames.value = line.lname;
//          td_cb.appendChild(lnames);

//          logins.type = "hidden";
//          logins.name = "logins";
//          logins.value = line.login;
//          td_cb.appendChild(logins);

//          emails.type = "hidden";
//          emails.name = "emails";
//          emails.value = line.email;
//          td_cb.appendChild(emails);
//          tr.appendChild(td_cb);
         
//          td_first.innerHTML = line.fname;
//          tr.appendChild(td_first);

//          td_last.innerHTML = line.lname;
//          tr.appendChild(td_last);

//          td_login.innerHTML = line.login;
//          tr.appendChild(td_login);

//          td_email.innerHTML = line.email;
//          tr.appendChild(td_email);
         
//          tableMemebers.appendChild(tr);
//      });
//  }

//  function updateAllCheckboxes( state ){
//      var cbos = document.querySelectorAll('input[name="reg-now"]');
//      for( var i in cbos ){
//          cbos[i].checked = state;
//      }
//  }
 
//  function updateCboClick(){
//      var cbosChecked = document.querySelectorAll('input[name="reg-now"]:checked');
//      var cbos = document.querySelectorAll('input[name="reg-now"]');
//      if( cbosChecked.length > 0 ) {
//      	$('#btn-select-none').removeClass('disabled');
//      	$('#btn-approve-selected').removeClass('disabled');
//      } else {
//      	$('#btn-select-none').addClass('disabled');
//      	$('#btn-approve-selected').addClass('disabled');
//      }

//      if(cbosChecked.length < cbos.length) {
//      	$('#btn-select-all').removeClass('disabled');
//      } else {
//      	$('#btn-select-all').addClass('disabled');
//      }
//  }

//  $('#btn-select-all').click(function() {
//  	if(!$('#btn-select-all').hasClass('disabled')) {
		// $('#btn-select-all').addClass('disabled');
		// $('#btn-select-none').removeClass('disabled');
		// $('#btn-approve-selected').removeClass('disabled');
		// updateAllCheckboxes(true);
//  	}
//  });

//  $('#btn-select-none').click(function() {
//  	if(!$('#btn-select-none').hasClass('disabled')) {
		// $('#btn-select-all').removeClass('disabled');
		// $('#btn-select-none').addClass('disabled');
		// $('#btn-approve-selected').addClass('disabled');
		// updateAllCheckboxes(false);
//  	}
//  });

//  $('#btn-approve-selected').click(function() {
//  	if(!$('#btn-approve-selected').hasClass('disabled')) {
//  		createApproveTable();
//  		$('#approve_window').modal('show');
//  	}
//  });

//  function createApproveTable() {
//  	var tableApprove = document.querySelector('#approve_body');
//      var cbos = document.querySelectorAll('input[name="reg-now"]:checked'),
//          fnames = document.querySelectorAll('input[name="fnames"]'),
//          lnames = document.querySelectorAll('input[name="lnames"]'),
//          logins = document.querySelectorAll('input[name="logins"]'),
//          emails = document.querySelectorAll('input[name="emails"]');

//      while (tableApprove.hasChildNodes()) {
//          tableApprove.removeChild(tableApprove.firstChild);
//      }

//      var index = 0;
//      var items = 0;
//      var i = 0;
//      while(items < cbos.length) {
//          if(cbos[index].value == i) {
//              var tr = document.createElement('tr'),
//                  td_first = document.createElement('td'),    // first name field
//                  td_last = document.createElement('td'),     // last name field
//                  td_login = document.createElement('td'),    // login name field
//                  td_email = document.createElement('td');    // email field
             
//              td_first.innerHTML = fnames[i].value;
//              tr.appendChild(td_first);

//              td_last.innerHTML = lnames[i].value;
//              tr.appendChild(td_last);

//              td_login.innerHTML = logins[i].value;
//              tr.appendChild(td_login);

//              td_email.innerHTML = emails[i].value;
//              tr.appendChild(td_email);
             
//              tableApprove.appendChild(tr);
//              items++;
//              index++;
//          }
//          i++;
//      }
//  }

//  $('#btn-cancel-approve').click(function() {
//  	$('#approve_window').modal('hide');
//  });

//  $('#btn-confirm-approve').click(function() {
//  	var cbos = document.querySelectorAll('input[name="reg-now"]:checked');
//      var ids = document.querySelectorAll('input[name="ids"]');
//      var index = 0;
//      var items = 0;
//      var i = 0;
     
//      while(items < cbos.length) {
//          if(cbos[index].value == i) {
//              approveUser(ids[i].value);
//              items++;
//              index++;
//          }
//          i++;
//      }
//      $("#approve_window").modal("hide");
//  });

//  function approveUser(id) {
//      $.getJSON('/approve_pro', { "id" : id }, function(data){
//          window.location.reload();
//      });
//  };