function tw() {
	setTimeout(function(){ $('.close').show('slide', {direction: 'right'}, 100); }, 400);
  $('.yes').show('slide', {direction: 'right'}, 400);
  
}
function closee(){
	$('.yes').hide('slide', {direction: 'right'}, 400);
	$('.close').hide('slide', {direction: 'right'}, 10);
}
