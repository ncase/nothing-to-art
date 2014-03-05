/*
This code is dedicated to the public domain under the Unlicense. <http://unlicense.org>
Created by Nicky Case (@ncasenmare). Attribution is always welcome, but not required!
*/
(function(){

	///////////////////////////
	// DEFAULT CONFIGURATION //
	///////////////////////////

	window.SS_SOCIAL_API = {
		twitter: {
			template:
				"<div onclick='window.SS_POPUP(\"https://twitter.com/share?via=ncasenmare&url={{link}}&text={{text}}&nothing=\",\"twitter\")'>"+
				"	<div id='ss_icon'></div>"+
				"</div>",
			link: "http://bundle.nothingtohide.cc"
		},	
		facebook: {
			template:
				"<div onclick='window.SS_POPUP(\"https://www.facebook.com/sharer/sharer.php?u={{link}}&t={{text}}\",\"facebook\")'>"+
				"	<div id='ss_icon'></div>"+
				"</div>",
			link: "http://bundle.nothingtohide.cc"
		},	
		reddit: {
			template:
				"<div onclick='window.open(\"http://www.reddit.com/submit?url={{link}}&title={{text}}\",\"_blank\")'>"+
				"	<div id='ss_icon'></div>"+
				"</div>",
			link: "http://bundle.nothingtohide.cc"
		}
	};
	window.SS_STYLE = ""+
		".s-s{ display:inline-block; width:75px; height:75px; cursor:pointer; } "+
		".s-s #ss_icon{ width:75px; height:75px; background:url(/img/social.png); } "+
		".s-s[data-type='twitter'] #ss_icon{ background-position:0px 0px; } "+
		".s-s[data-type='twitter']:hover #ss_icon{ background-position:-75px 0px; } "+
		".s-s[data-type='facebook'] #ss_icon{ background-position:-150px 0px; } "+
		".s-s[data-type='facebook']:hover #ss_icon{ background-position:-225px 0px; } "+
		".s-s[data-type='reddit'] #ss_icon{ background-position:-300px 0px; } "+
		".s-s[data-type='reddit']:hover #ss_icon{ background-position:-375px 0px; } ";

	// A helper for popup windows
	window.SS_POPUP = function(url,type){

		var w,h;
		switch(type){
			case "twitter": w=550; h=500; break;
			case "facebook": w=670; h=400; break;
			default: w=500; h=500; break;
		}
		var x = (screen.width/2)-(w/2);
  		var y = (screen.height/2)-(h/2);

		var popupConfig = "width="+w+",height="+h+",left="+x+",top="+y+",";
		popupConfig += "resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes";
		window.open(url,"popup",popupConfig);

	};

	////////////////////////////////////////
	// CREATE SOCIAL MINUS SPYING BUTTONS //
	////////////////////////////////////////

	// Initialize S-S only after the rest of the page loads
	window.addEventListener("load",function(){
	
		// Add stylesheet to top
		var style = document.createElement("style");
		style.innerHTML = SS_STYLE;
		document.head.appendChild(style);

		// Convert all S-S divs to share buttons
		var shareButtons = document.querySelectorAll(".s-s");
		for(var i=0;i<shareButtons.length;i++){
			convertToButton(shareButtons[i]);
		}

		// And, finally...
		notifyTheNSA();

	},false);

	// Convert a placeholder S-S div to a share button
	var convertToButton = function(dom){

		// Get Social API config
		var type = dom.getAttribute("data-type");
		var apiConfig = SS_SOCIAL_API[type];
		if(!apiConfig) return;

		// Config from attribute list
		var config = {};
		for(var i=0; i<dom.attributes.length; i++){
			
			var attr = dom.attributes[i];

			// Is it a data- attribute?
			var name = attr.name;
			var prefixIndex = name.indexOf("data-");
			if(prefixIndex<0) continue;
			name=name.substr(prefixIndex+5);

			// If so, add to config
			config[name] = attr.value;

		}

		// If not specified, override with default Link & Text
		//config.link = encodeURIComponent(config.link || window.location.href);
		config.text = encodeURIComponent(config.text || document.head.getElementsByTagName("title")[0].innerHTML);

		// If not specified, override with preset config
		for(var name in apiConfig){
			var value = apiConfig[name];
			if(config[name]) continue;
			config[name] = value;
		}

		// Generate button HTML
		dom.innerHTML = generateHTML(config.template,config);

	};

	// Lightweight templating
	var generateHTML = function(template,config){
		var html = template;
		for(var name in config){
			var value = config[name];
			html = html.replace("{{"+name+"}}",value,"g");
		}
		return html;
	};

	// ha ha
	var notifyTheNSA = function(){
		// I was just kidding, but thank you for reading the source!
		// It's awesome that you like taking a look under the hood.
		// Like minds! :)
	};

})();