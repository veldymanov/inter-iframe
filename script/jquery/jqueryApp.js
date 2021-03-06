/****************************************
* Mouse Listener for iframe chat object
*****************************************/
var mouseListener = {
	
	deleteFrame: function(/*$('.js-deleteFrame')*/elem){
		elem.on('mousedown', function(e){
			e.preventDefault();	
			iframeChat.deleteFrame( $(this) );
		});			
	},
	
	touchCheck: function(/*$('.js-iframe-container')*/ elem) {	
		try {
			document.createEvent('TouchEvent');
			//  We are on a device that supports touch			
		} catch (e) {
			//  Then we aren't on a device that supports touch
			this.dragDrop(elem)
		} 
	},
	
	dragDrop: function(/*$('.js-iframe-container')*/elem){
		
		//iframe Drag'n'Drop
		elem.on('mousedown', function(e){
			var elem = this;
			var left0 = isNaN(parseInt($(elem).css('left'), 10)) ? 0 : parseInt($(elem).css('left'), 10);
			var top0 = isNaN(parseInt($(elem).css('top'), 10)) ? 0 : parseInt($(elem).css('top'), 10);
			var deltaX0 =  left0 - e.pageX; 
			var deltaY0= top0 - e.pageY;

			$(".js-iframe-container").children(".js-iframe").css( "zIndex", -2 );
			$(".js-iframe-container").children(".js-deleteFrame").css( "zIndex", -2 );
			// over the rest
			$(elem).children(".js-iframe").css( "zIndex", -1 ); 
			$(elem).children(".js-deleteFrame").css( "zIndex", -1 ); 

			function moveAt(e) {
				$(elem).css({
					'left': e.pageX + deltaX0 + 'px',
					'top': e.pageY + deltaY0 + 'px'
				});			
			}

			document.onmousemove = function(e) {
				e.preventDefault();
				moveAt(e);
			};

			elem.onmouseup = function() {
				e.preventDefault();
				document.onmousemove = null;
				elem.onmouseup = null;	
			};
		});	
	}	
};

/****************************************
* Touch Listener for iframe chat object
*****************************************/
var touchListener = {
	log: function(msg) {
//		var p = document.getElementById('log');
//		p.innerHTML = p.innerHTML + "<br>" + msg;
	},
	
	touchCheck: function(/*$(.js-iframe-container)*/ elem) {		
		try {
			document.createEvent('TouchEvent');
			//  We are on a device that supports touch			
			this.makeTouchable(elem);
		} catch (e) {
			//  Then we aren't on a device that supports touch
		} finally {					

		}
	},
		
	makeTouchable: function(/*jQuery*/ elem) {
		elem.each(function() {
			this.addEventListener('touchstart', function(e) {
				touchListener.touchStart($(this), e);
			}, false);
				
			this.addEventListener('touchmove', function(e) {
				touchListener.touchMove($(this), e);
			}, false);		
				
			this.addEventListener('touchend', function(e) {		
				touchListener.touchEnd($(this), e);
			}, false);	
		});
	},		

	touchStart: function(/*JQuery*/ elem, /*event*/ e) {	
		this.startX = e.targetTouches[0].clientX;
		this.startY = e.targetTouches[0].clientY;
		this.startRight =  isNaN(parseInt(elem.css('left'), 10)) ? 0 : parseInt(elem.css('left'), 10);
		this.startTop =  isNaN(parseInt(elem.css('top'), 10)) ? 0 : parseInt(elem.css('top'), 10);	

		$(".js-iframe-container").children(".js-iframe").css( "zIndex", -2 );
		$(".js-iframe-container").children(".js-deleteFrame").css( "zIndex", -2 );
		// over the rest
		elem.children(".js-iframe").css( "zIndex", -1 ); 
		elem.children(".js-deleteFrame").css( "zIndex", -1 ); 	
	},
		
	touchMove: function(/*JQuery*/ elem, /*event*/ e) {
		e.preventDefault();
	
		var deltaX = e.targetTouches[0].clientX - this.startX;
		var deltaY = e.targetTouches[0].clientY - this.startY;
		
		elem.css({
			'left': this.startRight + deltaX + 'px',
			'top': this.startTop + deltaY + 'px',				
		});	
	},	
		
	touchEnd: function(/*JQuery*/ elem, /*event*/ e) {
		
	}
};

/****************************************
* Iframe chat object
*****************************************/
var iframeChat = {
	
	counter: 1,
	
	targetOrigin: '*', //'http://localhost:3000',	
	
	createFrame: function() {
		var frameContainer = $("<div class='iframe-container js-iframe-container'>");
		var iframe = $("<iframe class='iframe js-iframe'></iframe>");
		var deleteFrame = $("<a href='' class='deleteFrame js-deleteFrame'>X</a>");	
		
		frameContainer.append(iframe);
		frameContainer.append(deleteFrame);
		$(".js-body").append(frameContainer);
		
		$(".js-iframe")[$(".js-iframe").length - 1].srcdoc = "<!DOCTYPE html>" +
			"<html>" +
			"<head>" +
				"<link rel='stylesheet' href='style/normalize.css' />" +
				"<link href='style/iframe.css' rel='stylesheet' type='text/css'/>" +
			"</head>" +
			"<body id='js-body'>" +
				"<ul class='comments'  id='js-comments'></ul>" +
				"<form id='js-form' class='form'>" +
					"<label for='js-msg' id='js-lbl_msg' class='label'>[iFrame" + this.counter + "]:</label>" +
					"<input type='text' id='js-msg' class='msg' placeholder='Write message'/>" +
					"<input type='submit' class='submit' value='Send'/>" +
				"</form>" +
				"<script src='script/jquery/jquery-3.2.0.min.js'></script>" +
				"<script src='script/jquery/jqIframeApp.js'></script>" +
			"</body>" +
			"</html>";
			
		/*******************************************
		* Add mouse listeners to iframe chat object
		********************************************/
		//delete iframe
		mouseListener.deleteFrame(deleteFrame);
		//mouse drag'n'drop listener
		mouseListener.touchCheck(frameContainer);
		
		/*******************************************
		* Add touch listeners to iframe chat object
		********************************************/
		//touch drag'n'drop listener
		touchListener.touchCheck(frameContainer);	
		
		
		this.counter++;
	},
		
	postToAllFrames: function(msg, targetOrigin) {
		/****************************
		* Post message to all iframes
		*****************************/
		var allIframes = $(".js-iframe");	
			
		for (var i = 0; i < allIframes.length; i++){
			allIframes[i].contentWindow.postMessage(msg, targetOrigin);
		}	
	},
	
	deleteFrame: function(elem) {			
		//get iframe number	
		var iframeName = $(elem).prev().contents().find("#js-lbl_msg").text(); 
		var index = iframeName.indexOf(':');
		var iframeName = iframeName.slice( 1, index-1 );
		
		//Send message about iframe deletion
		iframeChat.postToAllFrames("[system]: " + iframeName + " left the conversation", 
									iframeChat.targetOrigin);	
		
		// iframe-container (div) invisible		
		$(elem).closest( ".js-iframe-container").css({'visibility': 'hidden'}); //.remove();	
		$(elem).prev().css({'display': 'none'});
	}
};


jQuery(document).ready(function(){
	window.addEventListener('message', function (e) {		
		// Message security check		
		if (e.origin !== iframeChat.targetOrigin){
//			console.log("e.origin: " + e.origin);
//			return;
		}
		
		//Post msg to all iframes
		iframeChat.postToAllFrames(e.data, iframeChat.targetOrigin);	
	});
	
	//Create iframe
	$(".plus").on('click', function(){
		iframeChat.createFrame();
	});	
});