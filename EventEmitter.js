/**
 * Cette classe permet de gérer des événements
 */
function EventEmitter() {
	//Liste des écoutes
	this.events = [];
}


EventEmitter.prototype.on = function(eventName, fn) {
	this.events.push( {
		eventName : eventName,
		fn : fn
	} );
	return this;
};

EventEmitter.prototype.off = function(eventName) {
	for(var i = 0; i < this.events.length; ++i ) {
		if ((eventName=='*' || eventName == this.events[i].eventName)) {
			this.events.splice(i,1);
			return this.off( eventName );
		}
	}
	return this;
};

EventEmitter.prototype.emit = function(eventName, args) {
	for(var i = 0; i < this.events.length; ++i ) {
		if (eventName == this.events[i].eventName) {
			this.events[i].fn(args);
		}
	}
	return this;
};

EventEmitter.prototype.once = function(eventName, fn) {
	var _this = this;
	var _fn = function(args) {
		fn(args);
		_this.off( eventName );
	};
	this.on( eventName, _fn );
	return this;
};

EventEmitter.prototype.times = function(eventName, num, fn) {
	var _this = this;
	var _fn = function(args) {
		if (num-- > 0) {
			fn(args);
		} else {
			_this.off(eventName);
		}
	}
	this.on(eventName, _fn);
	return this;
}
