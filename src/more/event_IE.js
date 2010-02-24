// private event functions
(function () {

var cache = {};

/**
 *
 * @namespace {Event}
 * @example
 *
 * Event
 * ---
 *	
 * A good new skool fashioned event handling system.
 * 
 */
xui.extend({
	/**
	 *
	 * Register callbacks to DOM events.
	 * 
	 * @param {Event} type The event identifier as a string.
	 * @param {Function} callback The callback function to invoke when the event is raised.
	 * @return self
	 * @example
	 * 
	 * ### on
	 * 
	 * Registers a callback function to a DOM event on the element collection.
	 * 
	 * This method has shortcut aliases for: 
	 *
	 * - click
	 * - load
	 * - touchstart
	 * - touchmove
	 * - touchend
	 * - touchcancel
	 * - gesturestart
	 * - gesturechange
	 * - gestureend
	 * - orientationchange
	 *
	 * For more information see:
	 * 
	 * - http://developer.apple.com/webapps/docs/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/chapter_7_section_1.html#//apple_ref/doc/uid/TP40006511-SW1
	 *
	 * syntax:
	 *
	 * 		x$('button').on( 'click', function(e){ alert('hey that tickles!') });
	 * 
	 * or...
	 * 
	 * 		x$('a.save').click(function(e){ alert('tee hee!') });
	 *
	 * arguments:
	 *
	 * - type:string the event to subscribe to click|load|etc
	 * - fn:function a callback function to execute when the event is fired
	 *
	 * example:
	 * 	
	 * 		x$(window).load(function(e){
	 * 			x$('.save').touchstart( function(evt){ alert('tee hee!') }).css(background:'grey');	
	 *  	});
	 * 	
	 */
	 
	on: function(type, fn) {
		if (window.addEventListener) { 
		  return this.each(function (el) {
		  el.addEventListener(type, _createResponder(el, type, fn), false);
		  });
		  } else { //very sad way to do this... still looking for better alternative...
				return this.each(function(el) {
					switch (type) {
						case "keyup" :
							el.onkeyup=fn;
						case "click" :
							el.onclick=fn;
						case "touchmove" :
							el.touchmove=fn;
						case "load" :
							el.onload=fn;
					}//need complement...
				});
			}
		},

	
	un: function(type) {
	  var that = this;
	  return this.each(function (el) {
      var id = _getEventID(el), responders = _getRespondersForEvent(id, type), i = responders.length;

      while (i--) {
        el.removeEventListener(type, responders[i], false);
      }
      
      delete cache[id];
	  });
	},
	
	fire: function (type, data) {
	  return this.each(function (el) {
      if (el == document && !el.dispatchEvent)
        el = document.documentElement;

      var event = document.createEvent('HTMLEvents');
      event.initEvent(type, true, true);
      event.data = data || {};

      event.eventName = type;
      el.dispatchEvent(event);
	  });
	}
//---
});

// lifted from Prototype's (big P) event model
function _getEventID(element) {
  if (element._xuiEventID) return element._xuiEventID[0];
  return element._xuiEventID = [++_getEventID.id];
}

_getEventID.id = 1;

function _getRespondersForEvent(id, eventName) {
  var c = cache[id] = cache[id] || {};
  return c[eventName] = c[eventName] || [];
}

function _createResponder(element, eventName, handler) {
  var id = _getEventID(element), r = _getRespondersForEvent(id, eventName);

  var responder = function(event) {
    if (handler.call(element, event) === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
  };

  responder.handler = handler;
  r.push(responder);
  return responder;
}

"click load submit touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange".split(' ').forEach(function (event) {
  xui.fn[event] = function (fn) { return fn ? this.on(event, fn) : this.fire(event); };
});

})();