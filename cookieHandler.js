/*
* Developed by Davide Calignano
* Cross-Domain-Cookie v1.0
*/


var cookieHandler = (function () {

  return {
  	settings: {
  		cookieName: "CookieAgreed",
  		linkPolicy: "http:///www.domain.it/privacy-policy",
		colorBox: 	"red",
		colorText: 	"white",
		text: 		"Questo sito utilizza cookie, anche di terze parti, per inviarti pubblicità e servizi in linea con le tue preferenze. Se vuoi saperne di più",
		textClick: 	"clicca qui",
		afterText: 	"Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all’uso dei cookie.",
		
  	},

    checkCookie: function (testThirdCookie) {
    	//Test if third party cookies are enabled
    	if(window.cookieHandler.getCookiePolicy(testThirdCookie)){
    		//Third party cookie enabled
    		//Delete cookie of test
    		document.cookie = testThirdCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    		//Check if cookie already accepted
    		if (!window.cookieHandler.getCookiePolicy(window.cookieHandler.settings.cookieName)){
			  	//Print banner
			  	parent.postMessage('window.cookieHandler.printCookieBox(1)',"*");
			}

    	}else{
    		//Third party cookie not enabled
    		//Continue with the parent, check and print
    		parent.postMessage('window.cookieHandler.getCookiePolicy("'+window.cookieHandler.settings.cookieName+'", "window.cookieHandler.printCookieBox(0)")',"*");
    	}
		
    },
    getCookiePolicy: function (cname, callback) {
		if(document.cookie.indexOf(cname) >= 0){
			return true;
		}else{
			if(callback) { eval(callback); }
			return false;
		}
    },
    
    setCookiePolicy: function (cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname+"="+cvalue+"; "+expires;
    },

    closeBoxCookie:  function(){
    	document.getElementById("box-cookie").className = "hiding";
		setTimeout(function(){
			document.getElementById("box-cookie").style.display='none';
		}, 300)
    },

    printCookieBox: function (enabled) {

		//Banner template
		var cookieCSS 	= "<style>#box-cookie{position:fixed; top:0; left:0; width:100%;background:"+this.settings.colorBox+";margin:0;max-height: 200px; overflow:hidden; -webkit-transition: max-height 0.3s; transition: max-height 0.3s;}#box-cookie p{text-align:center;font-size:12px; color:"+this.settings.colorText+";line-height:20px;margin:0px;padding: 10px;}#box-cookie p a{text-decoration:underline;color:"+this.settings.colorText+"}#box-cookie p a:hover{text-decoration:none;color:#929db5}#box-cookie p a.close{margin:0 0 0 15px;text-decoration:none;font-size:8px;padding:2px 4px;border:1px solid "+this.settings.colorText+"}.smartphone #box-cookie p{font-size:10px;line-height:14px}#box-cookie.hiding{max-height:0;}</style>";
		var cookieHTML 	= "<p>"+this.settings.text+" <a target='_blank' href='"+this.settings.linkPolicy+"'>"+this.settings.textClick+"</a>. <span class='after-text'>"+ this.settings.afterText +"</span><a href='#' onclick='window.cookieHandler.setCookiePolicyHandler("+enabled+"); return false' class='close'>&#10005;</a></p>";
		
		//Append html
		var nodeCookie = document.createElement("div");
		nodeCookie.id = "box-cookie";
		nodeCookie.innerHTML = cookieCSS+cookieHTML;
		var parentGuest = document.getElementsByTagName("body")[0];
		parentGuest.appendChild(nodeCookie);

		//Close on scroll
		var onsScrollHandler = function () {
	    	var gap = 200;
			var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
			if( top > gap){
				window.cookieHandler.setCookiePolicyHandler(enabled);
				window.removeEventListener('scroll', onsScrollHandler, false);
				window.cookieHandler.closeBoxCookie();
			}
	    }
		window.addEventListener("scroll", onsScrollHandler, false);
    },

   	setCookiePolicyHandler: function(enabled){
   		if(enabled){
   			//Send a request to remote host to set the cookie
   			cookieSetter = document.getElementById('cookieSetter').contentWindow;
   			cookieSetter.postMessage('window.cookieHandler.setCookiePolicy(\"'+window.cookieHandler.settings.cookieName+'\",\"1\",365)', 'http://davidecalignano.it');	
   		}else{
   			//Set cookie locally
   			window.cookieHandler.setCookiePolicy(window.cookieHandler.settings.cookieName, 1, 365);
   		}

   		window.cookieHandler.closeBoxCookie();
   	}

  };
})();