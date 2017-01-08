function scrollSmooth(target){
	$('html, body').animate({
       	 	scrollTop: $( target ).offset().top
    }, 500);
}

$(document).ready(function() {
	// $('#see_more_button').click( function(event){

	// 	var target = $('#see_more_button_text a').attr('href');
	// 	console.log(target);

	// 	event.preventDefault();

	// 	scrollSmooth(target);
	// });

	$('a[href*=\\#]:not([href=\\#])').click( function(event){

		var target = $(this).attr('href');

		console.log(target);

		event.preventDefault();

		scrollSmooth(target);
	});

	// $('.nav_bar_fixed .title a').click( function(event){

	// 	var target = $(this).attr('href');

	// 	console.log(target);

	// 	event.preventDefault();

	// 	scrollSmooth(target);
	// });
});