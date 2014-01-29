$(document).ready(function() {
	exList = [];

	var delay = (function(){
		var timer = 0;

		return function(callback, ms) {
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	$('#input-search').keyup(function(e) {
		if($(this).val().length > 0) {
			delay(function() { doSearch(); }, 750);
		} else {
			$('#library-exercise-list').html('');
		}
	});

	$('#input-search').keypress(function(e) {
		if(e.keyCode == 13) {
			doSearch();
		}
	});

	$('.icon-search').hover(function() {
		$(this).css('cursor', 'pointer');
	}).click(function() {
		if($('#input-search').val().length > 0)
			doSearch();
	});

	$('body').mouseup(function(e) {
        var container = $('#search-exercise-list');

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.html('');
        }
    });
});

function doSearch() {
	$.getJSON(
		'/fitness/get_ex_search_results',
		{ 
			'query' : $('#input-search').val()
		},
		function(data) {
			var search_list = $('#search-exercise-list');
			search_list.html('');
			exList = [];

			var div;
			var text;
			
			if(data.length > 0) {
				if(search_list.hasClass('library-search')) {
					div = '<div class="search-results display-all">';
					div += '<center><strong> Display All Results in Detail </strong></center>';
					div += '</div>';
					search_list.append(div);
				}
					
				$.each(data, function(i, ex) {
					exList.push(ex);
					div = '<div class="search-results">';
					div += '<i class="icon-plus-sign"></i>  ';

					text = '<strong>' + ex.name + '</strong><br>';
					text += '<span class="label label-info">E : ' + ex.equip + '</span>';
					text += '&nbsp;';
					text += '<span class="label label-info">M : ' + ex.muscle + '</span>';
					text += '&nbsp;';
					text += '<span class="label label-info">T : ' + ex.exercise_type + '</span>';

					div += text;
					div += '<input type="hidden" class="ex-num" value="' + i + '" />';
					div += '</div>';

					search_list.append(div);
				});

				$('.search-results').hover(function() {
					$(this).css('cursor', 'pointer');
				}).click(function() {
					if($(this).hasClass('display-all'))
						fillResultTable(data, 'the containing the term "' + $('#input-search').val() + '"');
					else {
						resultClicked(exList[parseInt( $(this).children('.ex-num').val())] );
						$('#search-exercise-list').html('');
					}
				});
			} else {
				div = '<div class="search-results">';
				div += '<strong> No Exercises Found. </strong>';
				div += '</div>';

				search_list.append(div);
			}
		}
	);
}
