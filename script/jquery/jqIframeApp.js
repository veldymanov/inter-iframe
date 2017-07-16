/****************************************
* Touch stop scroll propagation object
*****************************************/
var touchScroll = {
	log: function(msg) {
//		var p = document.getElementById('log');
//		p.innerHTML = p.innerHTML + "<br>" + msg;
	},
	
	touchCheck: function(/*jQuery*/ elem) {		
		try {		
			document.createEvent('TouchEvent');
			//  We are on a device that supports touch		
			this.stopScrollPropagation(elem);
		} catch (e) {
			//  Then we aren't on a device that supports touch
		} finally {					

		}
	},
			
	stopScrollPropagation: function(/*jQuery*/ elem){		
		elem.each(function() {		
			this.addEventListener('touchstart', function(e) {
				$(parent.document).find(".js-body").css('overflow','hidden');
			}, false);
				
			this.addEventListener('touchmove', function(e) {

			}, false);		
				
			this.addEventListener('touchend', function(e) {		
				$(parent.document).find(".js-body").css('overflow','auto');
			}, false);	
		});		
		
	}
};

jQuery(document).ready(function(){
	//Define targetOrigin
	var domain = "*"; //"http://localhost:3000";
	
	/************************************
	* Send message about iframe creation
	*************************************/
	var iframeNumber = $("#js-lbl_msg").text(); 
	iframeNumber = iframeNumber.slice(1, iframeNumber.length - 2);
	parent.postMessage("[system]: " + iframeNumber + " joined the conversation", domain);	

	/************************************
	* Post message
	*************************************/
	document.getElementById("js-form").addEventListener('submit', function(e){
		var name = document.getElementById("js-lbl_msg").innerHTML;
		var msg = document.getElementById("js-msg").value;
		
		parent.postMessage(name + ' ' + msg, domain);
		
		//Reset form
		this.reset();
			
		e.preventDefault();
	});
	
	/************************************
	* Receive and publish message
	*************************************/
	window.addEventListener('message', function (e) {
		// Message security check
		if (e.origin !== domain){
//			console.log("e.origin: " + e.origin);
//			return;
		}
		
		//Separete frame name from message
		var index = e.data.indexOf(':');
		var frameName = e.data.slice(0, index);
		var msg = e.data.slice(index + 1);
		
		var newComment = $("<li class='comments-item'>" + 
								"<strong>" + frameName + " - </strong>" +
								msg + "</li>");
			$(".comments").append(newComment);
			
			//Scroll to bottom
			var ulList = document.getElementById("js-comments");
			ulList.scrollTop = ulList.scrollHeight;
		});	
		
	/************************************
	* Set focus on input field
	*************************************/
	window.addEventListener('click', function () {
		$("#js-msg").focus();	
	});
	
	/************************************
	* Touch stop scroll propagation
	* to avoid document moving during 
	* touch scrolling
	*************************************/
	touchScroll.touchCheck($(window));
});