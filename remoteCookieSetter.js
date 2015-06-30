/*
* Developed by Davide Calignano
* CrossCookie v2 [after header]
*/


function printScript(callback){
	//create script
	var script = document.createElement('script');
    	script.src = "cookieHandler.js";
    	script.onload = function(){callback()};
    //Print script
	var parentGuest = document.getElementsByTagName("body")[0];
		parentGuest.appendChild(script);

}



// A function to process messages received by the window parent.
function receiveMessage(e) {
	eval( e.data );
}

// Setup an event listener that calls receiveMessage() when the window
// receives a new MessageEvent.
window.addEventListener('message', receiveMessage);



//Set a cookie just for test
var rand = new Date().getTime();
document.cookie = "TestForThirdPartyCookie-"+rand+"=1";

 
(function() {  	
  	//Get a cookie
	printScript(function(){window.cookieHandler.checkCookie("TestForThirdPartyCookie-"+rand)});

})();

