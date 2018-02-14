function formattedDate(d) {
	var month = String(d.getMonth() + 1);
	var day = String(d.getDate());
	var year = String(d.getFullYear());

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return year+"/"+month+"/"+day;
}
function DateFrToDateEn(d) {
	d = d.replace("/","");
	d = d.replace("/","");
	var r = "";
	var j = "";
	var m = "";
	var a = "";
	if(d.length == 8){j = d.substring(0, 2);m = d.substring(2, 4);a = d.substring(4, 8);r = a+"/"+m+"/"+j;}
	return r;
}
function formattedDateFrench(d) {
  	var month = String(d.getMonth() + 1);
	var day = String(d.getDate());
	var year = String(d.getFullYear());

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return day+"/"+month+"/"+year;
}
function DateToText(d) {
    arrayMois = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    var monthText = "";

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    for(w=0; w < arrayMois.length; w++) {
        if(w==(parseInt(month)-1)){
            monthText = arrayMois[w];
        }
    }

    return day+" "+monthText+" "+year;
}

function Occurence(tableau,search) {
	var n = 0;
	
    for(m=0; m < tableau.length; m++) {
        if(tableau[m]==search){
            n++;
        }
    }

    return n;
}

//MAP CONTROL
function loadMap(customTile){
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
	});

	L.tileLayer.provider(customTile).addTo(map);
	// L.tileLayer(
// 'https://api.mapbox.com/styles/v1/chamsmarena/cj99qjfpu3jgw2so4g70t8s9k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhbXNtYXJlbmEiLCJhIjoiY2o5N2I0NmE3MGI2ZzJxdTR4aW96cHpqciJ9.FCs4TCmzR2o6w01WSrGJtw', {

    // attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);
	
	//AJOUT DE LA CARTE WCA
	loadJSON(function(response) {
		dataFrontiereWCA = JSON.parse(response);
		
		geojsonLayer = new L.geoJSON(dataFrontiereWCA, 
			{style: function (feature) {
				return getColor(feature.properties.admin0Pcod);
			}}
		);
		 
		geojsonLayer.addTo(map);
	 });

	$(".legende").fadeIn("slow");
	$(".fondDetails").fadeIn("slow");
	
	widthleafletMap = parseInt($("#leafletMap").css("width").replace("px",""));
	$("#mapid").css({"height":widthleafletMap+"px"});
	
	FiltrerActualite();
	
	$(".leaflet-control-attribution").hide();
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', 'RowcaAdmin.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}
 
function getColor(pays) {
	
	var couleur = '#0099ff';
	var opacity = 0;
	var trouve = false;
	if(filtresPays.length != 0){
		for(i=0; i < filtresPays.length; i++) {
			if(pays==filtresPays[i]){
				opacity = 1;
			}
			
			////console.log(pays+' '+filtresPays[i]+' '+opacity);
		};
	}else{
		opacity = 1;
	}
	
	
	return {
		fillColor: couleur,
		weight: 2,
		opacity: opacity,
		color: couleur,
		dashArray: '3',
		fillOpacity: 0
    };				  
}

function TwoDateToText(d1,d2) {
    arrayMois = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month1 = String(d1.getMonth() + 1);
    var day1 = String(d1.getDate());
	var result = "";
    const year1 = String(d1.getFullYear());
	
    var month2 = String(d2.getMonth() + 1);
    var day2 = String(d2.getDate());
    const year2 = String(d2.getFullYear());
    var monthText2 = "";

    if (month1.length < 2) month1 = '0' + month1;
    if (day1.length < 2) day1 = '0' + day1;
	
    if (month2.length < 2) month2 = '0' + month2;
    if (day2.length < 2) day2 = '0' + day2;
    
    for(w=0; w < arrayMois.length; w++) {
        if(w==(parseInt(month1)-1)){
            monthText1 = arrayMois[w];
        }
    }
	
    for(w=0; w < arrayMois.length; w++) {
        if(w==(parseInt(month2)-1)){
            monthText2 = arrayMois[w];
        }
    }
    
	if(monthText1 == monthText2){
		result = day1+" - "+day2+" "+monthText1+" "+year1;
	}else{
		result = day1+" "+monthText1+" - "+day2+" "+monthText2+" "+year1;
	}

    return result;
}
function ShowActualiteOnMap(){
    ////console.log("data");
    //console.log(data);
    // var actualites=JSON.parse(data);
	//console.log("listeActualites.length");
	//console.log(listeActualites.length);
	
	var occur = 0;
		listCoordonnees = undefined;
	listCoordonnees = [];
    if(listeActualites!=null){
		for(is=0; is < (listeActualites.length); is++) {
			var hashTag = "";
			var quoteText = listeActualites[is][7];
			var tags = getHastag(listeActualites[is][11]);
				
			occur = Occurence(listCoordonnees,listeActualites[is][5]+listeActualites[is][6]);
			listCoordonnees.push(listeActualites[is][5]+listeActualites[is][6]);
			
			
			
			if(occur<=2)
			{
				
				var lng = (parseFloat(listeActualites[is][6])+ 0.17*occur);
				var lat = parseFloat(listeActualites[is][5]);
				
				var anchorDecal = 14 - 4*occur;
		
				var iconWidth = (29 - 4*occur);
				var iconHeight = (34 - 4*occur);
				console.log(iconWidth);
				var marker = L.marker([lat, lng], {icon: L.icon({iconUrl: 'images/leaflet/'+listeActualites[is][0]+listeActualites[is][10]+'.png', iconSize:[iconWidth, iconHeight],iconAnchor:[anchorDecal, 44], popupAnchor:[-3, -76]})}).addTo(map);
				marker.bindPopup("<span class='MarkerEventsCountry'>"+listeActualites[is][3]+"</span><div class='shareBloc'><a class='shareButton' href='https://twitter.com/intent/tweet?text="+tags+" "+quoteText+"' data-size='large'><img class='imgSocial' src='images/tw_01.png'></img></a> <a class='shareButton' target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fweekly-wca.unocha.org%2F&amp;src=sdkpreparse' data-size='large'><img class='imgSocial' src='images/fb_01.png'></img></span></a><span class='MarketEventsDate'>&nbsp "+formattedDateFrench(new Date(listeActualites[is][9]))+"</span></div><br/><span class='MarkerEventsTitle'>"+listeActualites[is][7]+"</span><br/><span class='MarkerEventsDetail'>"+listeActualites[is][8]+"</span>");
				markers.addLayer(marker);
			}
			
			//console.log("a"+is);
		}
		//console.log("fin");
		map.addLayer(markers);
		//console.log("fin2");
    }else{
		$(".zoneDetailsTableau").html("Error! can't get datas!");
    }
	
} 
function getImageUrl(){
	// create an empty canvas element
	  var image = new Image();
	  var dataURL = "kk";
      var canvas = document.createElement("canvas"),canvasContext = canvas.getContext("2d");
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        canvasContext.drawImage(image, 0, 0, image.width, image.height);
        dataURL = canvas.toDataURL();
		return dataURL;
      };
      image.src = "images/export/electionbleu.jpg";
}

function removeAllMarkers(){
	markers.clearLayers();
	
}

function ReduceText(texte,longMax){
	var result = texte;
	if(texte.length>longMax){
		result = texte.substring(0, longMax)+"...";
	}
	return result;
}
function CloseDetails(){
    $(".detailAcutalite").hide();
    $(".ligneDetail").css({"background-color":"#ffffff","color":"#000000"});
    $(".EventsCountry").css({"color":"#000000"});
}
function ShowActualiteDetails(){
	
    auteurDetail = $(".zoneDetails").css("height").replace("px","");
    auteurDetail = auteurDetail-40;
    nbLignes = Math.floor(auteurDetail/80);
    nbLignes = 20;
    
    // var actualites=JSON.parse(data);
	
    // listeActualites = actualites;
    console.log(listeActualites);
	
	$(".blocNbResult").html("");
    if(listeActualites!=null){
        nbActualite = listeActualites.length;
        if(nbActualite>0){
            
            AfficherBoutons();
            
            
            //AFFICHAGE DES LIGNES DETAILS DES ACTUALITES
            $(".zoneDetailsTableau").html("");
			$(".enteteDetail").html("");

            //AFFICHAGE DU TABLEAU DES ACTUALITES
            $(".zoneDetailsTableau").append("<table class='table' id='tableDetails'  style='border-bottom:none;'><thead hidden='hidden'><tr><th>news</th></tr></thead><tbody>");   
            for(id=0; id < nbActualite; id++) {
				var hashTag = "";
				var quoteText = listeActualites[id][7];
				var tags = getHastag(listeActualites[id][11]);
				var nomId='shareBtnFacebook'+id;

                $("#tableDetails").append("<tr><td><div class=''><div class='panel-heading' role='tablist' id='heading"+id+"'><h4 class='panel-title'><a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse"+id+"' aria-expanded='true' aria-controls='collapse"+id+"'><div class='BlocDetailImage'><span class='icon-"+listeActualites[id][0]+" "+listeActualites[id][10]+"' ></span></div><div class='BlocDetailText'><span class='EventsCountry'>"+listeActualites[id][3]+"</span><div class='shareBloc'><a class='shareButton' href='https://twitter.com/intent/tweet?text="+tags+" "+quoteText+"' data-size='large'><img class='imgSocial' src='images/tw_01.png'></img></a> <a class='shareButton' target='_blank' href='#' id='shareBtnFacebook"+id+"' data-size='large'><img class='imgSocial' src='images/fb_01.png'></img></a><span class='EventsDate'> "+formattedDateFrench(new Date(listeActualites[id][9]))+"</span></div></br><span class='EventsTitle'>"+listeActualites[id][7]+"</span></div></a></h4></div><div id='collapse"+id+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading"+id+"'><div class='panel-body'><div class='blocInform' id='blocInform"+id+"'><div><a href='http://www.inform-index.org/' target='_blank'><img class='logoInform' src='images/inform.png'></img></a></div><div class='informBars'></div></div><div class='detailTexte'>"+listeActualites[id][8]+"</div></div></div></div></td></tr>");
				
				(function (id) {
					var quoteText2 = listeActualites[id][7];
					tags = getHastag(listeActualites[id][11]);
					document.getElementById('shareBtnFacebook'+id).onclick = function() {
						FB.ui({
						method: 'share',
						display: 'popup',
						href: 'https://weekly-wca.unocha.org/',
						quote:quoteText2,
						hashtag:tags
					  }, function(response){});
					};
				}) (id);
				
				getInformData(listeActualites[id][9], listeActualites[id][2], listeActualites[id][0], "blocInform"+id);
            }
			

			
            $(".zoneDetailsTableau").append("</tbody></table>");
            var table = $('#tableDetails').DataTable({
                "pageLength": nbLignes,
                "lengthChange": false,
				"ordering": false,
                "fnDrawCallback": function() {
					
                    $(".paginate_button").show();
                    $(".disabled").hide();
                    $(".dataTables_filter").hide();
                    $("td").css({"padding":"0px"});
					$(".dataTables_paginate").detach().appendTo('.piedDetail');
					$(".dataTables_paginate .pagination").css({"margin": "10px","right": "10px"});
					
					var debut = this.fnPagingInfo().iStart + 1;
					$(".blocNbResult").html("<span class='textDownload texteGrand'>"+debut+" - "+this.fnPagingInfo().iEnd+" / "+this.fnPagingInfo().iTotal+" </span> entries found");
                }
            });
			
			// var info = table.page.info();
			// //console.log('info');
			// //console.log(info);
			
			
			$(".zoneDetailsTableau .row").css({"margin-right":"0px"});
            $(".dataTables_info").hide();
			$(".current").css({"color": "#0a7eca"});
			
			//LARGEURDU BLOC DETAIL
			ResizeBlocs();
			detailWidth = parseFloat($(".zoneDetails").css("width").replace("px",""));
			detailWidth = detailWidth - 20;
			$(".BlocDetail").css("width",detailWidth);

        }else{
            $(".zoneDetailsTableau").html("No result found.");
           CacherBoutons();
        }
    }else{
        $(".zoneDetailsTableau").html("Error! can't get datas contact the administrator.");
        CacherBoutons();
    }
}

function showSocialButton(indice){
	$(".imgSocial").hide();
	$("#twitter"+indice).show("fast");
	$("#facebook"+indice).show("fast");
}

function getHastag(tag){
	var arrayTags = {};
	var tags = "";
	
	if(tag!=""){
		arrayTags = tag.split(",");
		for(i=0; i < arrayTags.length; i++) {
			tags+="#"+arrayTags[i];
		}
	}
	return tags;
}

function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}
function ResizeBlocs(){

    var moveToMap;
    var auteurMenuCarte;
    var blocTileCarte;
    var auteurHeader;
    
	var detailWidth;
    
	
	
    moveToMap = parseInt($("#moveToMap").css("height").replace("px",""));
    auteurMenuCarte = parseInt($("#rowMenu").css("height").replace("px",""));
    auteurHeader = parseInt($(".searchBar").css("height").replace("px",""));
    

	if (isMobile.android.device || isMobile.apple.device ||  isMobile.amazon.device ||  isMobile.windows.device ) {
		$(".mapZone").css("height",(Winheight-50));
		$("#mapid").css("height",(Winheight-moveToMap*2-50));
		$("#mapid").css("width",(Winheight));
		$(".fondDetails").css("height",(Winheight-moveToMap-20));
		$(".zoneDetails").css("height",(Winheight-moveToMap-80));
		
	}else{
		$(".zoneDetails").css("height",(Winheight-auteurMenuCarte-170));
		$(".fondDetails").css("height",(Winheight-auteurMenuCarte-auteurHeader-12));
		
		$(".mapZone").css("height",Winheight-auteurMenuCarte-auteurHeader);
		$("#mapid").css("height",Winheight-auteurMenuCarte-auteurHeader);
	}
}
function CacherBoutons(){
	$("#buttonExportPdf").hide();
}
function AfficherBoutons(){
	$("#buttonExportPdf").show();
}


//FILTRES
function RemoveFilterPays(){
    id=$(this).attr("id");
	if(Pays == 'LCB'){
		nbPays = 4;
		k=0;
		while (k < nbPays) {
			for(i=0; i < filtresPays.length; i++) {
				if((filtresPays[i]=='NER') || (filtresPays[i]=='NGA') || (filtresPays[i]=='CMR') || (filtresPays[i]=='TCD')){
					filtresPays.splice(i,1);
				}
			}
			k++;
		}
	}
	
	if(Pays == 'SHL'){
		nbPays = 8;
		k=0;
		while (k < nbPays) {
			for(i=0; i < filtresPays.length; i++) {
				if((filtresPays[i]=='SEN') || (filtresPays[i]=='MRT') || (filtresPays[i]=='MLI') || (filtresPays[i]=='BFA') || (filtresPays[i]=='NER') || (filtresPays[i]=='NGA') || (filtresPays[i]=='CMR') || (filtresPays[i]=='TCD')){
					filtresPays.splice(i,1);
				}
			}
			k++;
		}
	}
	
	for(i=0; i < filtresPays.length; i++) {
		if(filtresPays[i]==id){
			filtresPays.splice(i,1);
			$(".filtrePays #"+id).remove();
		}
	}
	

	
	if(filtresPays.length==0){
		var dd = document.getElementById('Pays');
		dd.selectedIndex = 0;
	}
    
    FiltrerActualite();
	HoverPaysFiltred();
}
function RemoveFilterTheme(){
    id=$(this).attr("id");
    for(i=0; i < filtresThemes.length; i++) {
        if(filtresThemes[i]==id){
            filtresThemes.splice(i,1);
            $(".filtreTheme #"+id).remove();
        }
    }
	
	if(filtresThemes.length==0){
		var dd = document.getElementById('typeActu');
		dd.selectedIndex = 0;

	}
    
    FiltrerActualite();
}
function filtrerKeyWord(){
	FiltrerActualite();
	sendAanalytics("filtreKey",$("#keyword").val());
}
function FiltrerPays(){

    Pays = $("#Pays").val();
	//map.panTo([5.6,-0.23],{animate:true});
	
	
	if(Pays=="all"){
		filtresPays = [];
		$(".filtrePays button").remove();
		
	}else{
		//////console.log(Pays);
		LibellePays = $("#Pays option:selected").text();
	   
		filtered = false;
		
		if(filtresPays.length>0){
			for(i=0; i < filtresPays.length; i++) {
				if(filtresPays[i]==Pays){
					filtered=true;
				}
			}
		}
		
		if(Pays == 'LCB'){
			filtresPays.push('NER');
			filtresPays.push('NGA');
			filtresPays.push('CMR');
			filtresPays.push('TCD');
		}
		if(Pays == 'SHL'){
			filtresPays.push('SEN');
			filtresPays.push('MRT');
			filtresPays.push('MLI');
			filtresPays.push('BFA');
			filtresPays.push('NER');
			filtresPays.push('NGA');
			filtresPays.push('CMR');
			filtresPays.push('TCD');
		}
		
		if(!filtered){
			$(".filtrePays").append("<button type='button' id='"+Pays+"' class='buttonFiltrePays btn btn-default btn-xs'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> "+LibellePays+"</button>");
			fPays = document.getElementById(Pays)
			fPays.addEventListener("click", RemoveFilterPays);
			filtresPays.push(Pays);
		}
		
		
	}
	
	FiltrerActualite();
	HoverPaysFiltred();
    sendAanalytics("filtrePays",Pays);
}
function FiltrerTheme(){
    theme = $("#typeActu").val();
	
	if(theme=="all"){
		filtresThemes = [];
		$(".filtreTheme button").remove();
		
	}else{
		LibelleTheme = $("#typeActu option:selected").text();
		filtered = false;
		
		if(filtresThemes.length>0){
			for(i=0; i < filtresThemes.length; i++) {
				if(filtresThemes[i]==theme){
					filtered=true;
				}
			}
		}
		
		if(!filtered){
			$(".filtreTheme").append("<button type='button' id='"+theme+"' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> "+LibelleTheme+"</button>");
			fTheme = document.getElementById(theme)
			fTheme.addEventListener("click", RemoveFilterTheme);
			filtresThemes.push(theme);
		}
	}
	
	
    FiltrerActualite();
	sendAanalytics("filtreTag",theme);
}
function FiltrerActualite(){

	
	$('#blocOrder').hide();
	var dateDebutFormat = DateFrToDateEn($("#dateStart").val());
    var dateFinFormat = DateFrToDateEn($("#dateEnd").val());
    var keyWord = $("#keyword").val();
	
	var dateDebut= new Date(dateDebutFormat);
    var dateFin= new Date(dateFinFormat);
	
	var ValdateDebut = new Date(dateDebutFormat).getTime();
    var ValdateEnd = new Date(dateFinFormat).getTime();
	
    removeAllMarkers();

	map.setView([7.100893,  10.239258], 4);
	CacherBoutons();
	
	
    $(".info_panelClick").remove();
	
	
	
    if( (ValdateDebut > ValdateEnd))
    {
        //DATES INCORRECTS
		$(".zoneDetailsTableau").html("First date must be before second date!");
		$("#carte").hide();
    }
    else
    {
        if(!isNaN(dateDebut.getTime())&&!isNaN(dateFin.getTime())){    
			getActualite(dateDebutFormat,dateFinFormat,filtresPays, filtresThemes,keyWord);
			//AfficherBoutons();
		}else{
			$(".zoneDetailsTableau").html("Please select two dates!");
			$("#carte").hide();
		}
    }  
	
	ResizeBlocs();	
	$('#blocOrder').show();
	
}
function HoverPaysFiltred(){
	if(geojsonLayer!=undefined){
		geojsonLayer.remove();
		geojsonLayer = new L.geoJSON(dataFrontiereWCA, 
			{style: function (feature) {
				return getColor(feature.properties.admin0Pcod);
			}}
		);
		geojsonLayer.addTo(map);
	}
}

//AJAX
function getXMLHttpRequest() {
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}
function getActualite(datestart,dateend, filtrePays, filtreTheme,keyWord) {
    
    var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			data = this.responseText;
		
			listeActualites = JSON.parse(data);
			
			ShowActualiteOnMap();
			ShowActualiteDetails();

			//******* fin affichage des filtre **********
		} else if (xhr.readyState < 4) {
			
		}
	};

	xhr.open("POST", "scripts/GetActualite.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("dateDebut="+datestart+"&dateFin="+dateend+"&filtrePays="+ArrayToVar(filtresPays)+"&filtreTheme="+ArrayToVar(filtreTheme)+"&keyWord="+keyWord+"&orderElement="+orderElement+"&orderWay="+orderWay);
}
function getInformData(dateActualite, codePays, typeCategorieActualite, blocCible) {
    
    var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			data = this.responseText;
		
			var donneeInform = JSON.parse(data);
			console.log("donneeInform");
			console.log(donneeInform);
			
			$("#"+blocCible+" .informBars").html("");
			for(ig=0; ig < donneeInform.length; ig++) {
				
				var valeur = parseFloat(donneeInform[ig][1])*10;
				$("#"+blocCible+" .informBars").append("<div class='fondbar'><div class='titreInform'>"+ReduceText(donneeInform[ig][0],28)+" <strong>"+donneeInform[ig][1]+"</strong></div><div  class='valeurbar CouleurInform"+donneeInform[ig][2]+"' style='width:"+valeur+"%;'></div></div>");
			}
			
		} else if (xhr.readyState < 4) {
			
		}
	};

	xhr.open("POST", "scripts/getInformData.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("dateActualite="+dateActualite+"&codePays="+codePays+"&typeCategorieActualite="+typeCategorieActualite);
}
function getInformDataForPDf(dateActualite, codePays, typeCategorieActualite) {
    
    var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			data = this.responseText;
			donneesInformPdf = JSON.parse(data);
			console.log(donneesInformPdf);
		} else if (xhr.readyState < 4) {
			
		}
	};

	xhr.open("POST", "scripts/getInformData.php", false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("dateActualite="+dateActualite+"&codePays="+codePays+"&typeCategorieActualite="+typeCategorieActualite);
}

function sendAanalytics(action,detailAction) {
    var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {

		} else if (xhr.readyState < 4) {
			
		}
	};

	xhr.open("POST", "scripts/sendAanalytics.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.send("action="+action+"&detailAction="+detailAction);
}

function selectFiltre(source, entite, selectId){
    var sourceValue = source.options[source.selectedIndex].value;
	
	var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			LoadSelectOption(xhr.responseXML,selectId);
			//******* fin affichage des filtre **********
		} else if (xhr.readyState < 4) {
			
		}
	};
	
	xhr.open("POST", "scripts/select.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("valeur= "+sourceValue+" & entite= "+entite+"");
}
function LoadSelectOption(oData,selectId) {
	var nodes = oData.getElementsByTagName("item");
	var objet = document.getElementById(selectId);
	var oOption, oInner;
	objet.innerHTML = "";
	for (var i=0, c=nodes.length; i<c; i++) {
		oOption = document.createElement("option");
		oInner  = document.createTextNode(nodes[i].getAttribute("name"));
		oOption.value = nodes[i].getAttribute("id");
		oOption.appendChild(oInner);
		objet.appendChild(oOption);
	}
}


//OTHERS
function ArrayToVar(filtreArray){
    
    var result="";
    if(filtreArray.length!=0){
        for(i=0; i < filtreArray.length; i++) {
            if(i!=(filtreArray.length-1)){
                result+=filtreArray[i]+"_";
            }else{
                result+=filtreArray[i];
            }
        }
    }
    return result;
}
function ArrayToVar2(filtreArray,listeDataIdLabel,separator){
    
    var result="";
    if(filtreArray.length!=0){
        for(i=0; i < filtreArray.length; i++) {
            if(i!=(filtreArray.length-1)){
                result+=GetLabel(listeDataIdLabel,filtreArray[i])+separator;
            }else{
                result+=GetLabel(listeDataIdLabel,filtreArray[i]);
            }
        }
    }
    return result;
}
function MakeToArray(texte){
    var tmpArray = texte.split(" ");
    var finalArray= [];
    var finalLine = "";
    //////////console.log("split tmpArray");
    //////////console.log(tmpArray);
    for(j=0; j < tmpArray.length; j++) {
        if((tmpArray[j].length + finalLine.length)<126){
            finalLine = finalLine+" "+tmpArray[j];
        }else{
            finalArray.push(finalLine);
            finalLine = tmpArray[j];
        }
        if(j==(tmpArray.length-1)){
            finalArray.push(finalLine);
        }
    }
    
    
    //////////console.log("split finalArray");
    //////////console.log(finalArray);
    return finalArray;
}
function GetLabel(tableau,id){
    var result = "";
    for(w=0; w < tableau.length; w++) {
        if(tableau[w][0]==id){
            result = tableau[w][1];
        }
    }
    return result;
}

