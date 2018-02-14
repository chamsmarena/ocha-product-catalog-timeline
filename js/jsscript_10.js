$(document).ready(function(){
	
	
	
});


$("#anytimeproduct").hover(function(){
	$('#anytimeproduct').animate({
		width:'75%'
	},150,"swing");
	$('#anytimeproduct .anytime').animate({
		width:'75%'
	},150,"swing");
	$('#anytimeproduct .rowTitle2').animate({
		width:'75%'
	},150,"swing");
	$('#scheduledproduct').animate({
		width:'25%'
	},150,"swing");
	$('#scheduledproduct .rowTitle').animate({
		width:'25%'
	},150,"swing");
});
$("#scheduledproduct").hover(function(){
	$('#scheduledproduct').animate({
		width:'75%'
	},150,"swing");
	$('#scheduledproduct .rowTitle').animate({
		width:'75%'
	},150,"swing");
	$('#anytimeproduct').animate({
		width:'25%'
	},150,"swing");
	$('#anytimeproduct .anytime').animate({
		width:'25%'
	},150,"swing");
	$('#anytimeproduct .rowTitle2').animate({
		width:'25%'
	},150,"swing");
});
