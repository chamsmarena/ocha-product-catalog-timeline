$(document).ready(function(){
	Winheight = $(window).height();
	$(".col1").css("height",Winheight);
	$(".col2").css("height",Winheight);
	
	
	$('.col1').bind('mouseenter', function() {
		var self = $(this);

		   $('.col1').animate({
				width:'75%'
			},150,"swing");
			$('.col1 .anytime').animate({
				width:'75%'
			},150,"swing");
			$('.col1 .rowTitle2').animate({
				width:'75%'
			},150,"swing");
			$('.col2').animate({
				width:'25%'
			},150,"swing");
			$('.col2 .rowTitle').animate({
				width:'25%'
			},150,"swing");

	}).bind('mouseleave', function(){
		this.iid && clearInterval(this.iid);
	});
	
	$('.col2').bind('mouseenter', function() {
		var self = $(this);
	
		   $('.col2').animate({
				width:'75%'
			},150,"swing");
			$('.col2 .rowTitle').animate({
				width:'75%'
			},150,"swing");
			$('.col1').animate({
				width:'25%'
			},150,"swing");
			$('.col1 .anytime').animate({
				width:'25%'
			},150,"swing");
			$('.col1 .rowTitle2').animate({
				width:'25%'
			},150,"swing");

	}).bind('mouseleave', function(){
		this.iid && clearInterval(this.iid);
	});
});

$(window).resize(function() {
	Winheight = $(window).height();
	$(".col1").css("height",Winheight);
	$(".col2").css("height",Winheight);
});


/*
$(".col1").hover(function(){
	$('.col1').animate({
		width:'75%'
	},150,"swing");
	$('.col1 .anytime').animate({
		width:'75%'
	},150,"swing");
	$('.col1 .rowTitle2').animate({
		width:'75%'
	},150,"swing");
	$('.col2').animate({
		width:'25%'
	},150,"swing");
	$('.col2 .rowTitle').animate({
		width:'25%'
	},150,"swing");
});
$(".col2").hover(function(){
	$('.col2').animate({
		width:'75%'
	},150,"swing");
	$('.col2 .rowTitle').animate({
		width:'75%'
	},150,"swing");
	$('.col1').animate({
		width:'25%'
	},150,"swing");
	$('.col1 .anytime').animate({
		width:'25%'
	},150,"swing");
	$('.col1 .rowTitle2').animate({
		width:'25%'
	},150,"swing");
});*/
