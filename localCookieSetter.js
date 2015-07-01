/*
* Developed by Davide Calignano
* Cross-Domain-Cookie v1.0
*/


//create iframe
var iframeCookie = document.createElement("iframe");
iframeCookie.id = "cookieSetter";
iframeCookie.style.display = "none";
iframeCookie.width = "0";
iframeCookie.height = "0";
iframeCookie.src = "path/to/child.html";
//create script
var script = document.createElement('script');
script.src = "path/to/cookieHandler.js";

//Print iframe and script
var parentGuest = document.getElementsByTagName("body")[0];
parentGuest.appendChild(iframeCookie);
parentGuest.appendChild(script);


//Communication from child to parent
//==================================
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) { eval( e.data ); },false);









