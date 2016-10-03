var main = function(){
	$(".tool").find("#top-text").keyup(function(){
    var x=$(this).val();
  	$(".top-caption").text(x);
  });
  $(".tool").find("#bottom-text").keyup(function(){
    var y=$(this).val();
  	$(".bottom-caption").text(y);
  });
  $(".tool").find("#image-url").keyup(function(){
    var x=$(this).val();
  	$(".meme img").attr("src",x);
  });
};
$(document).ready(main);
