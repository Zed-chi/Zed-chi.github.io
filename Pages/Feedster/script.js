var main = function() {
  $(".notification").click(function(){
  	$('.notification-menu').slideToggle();
  });
  $('.posts').on('click','.btn',function(){
  	$(this).toggleClass('btn-like');
  });
}

$(document).ready(main);