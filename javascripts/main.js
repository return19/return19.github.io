var navBarToogle = 0;


$(document).ready(function() {
	$(".nav_drawer_image").click(function(){
		if(navBarToogle){
			$(".nav_bar_mobile").css('height', '0%');
		} else {
			$(".nav_bar_mobile").css('height', '20%');
		}
		navBarToogle = 1 - navBarToogle;
	});
});