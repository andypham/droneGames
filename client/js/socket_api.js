var socket_api = {

	init: function(errorFn) {
		this.connectedEvents = [];
		this.disconnectEvents = [];
		this.drawSegmentEvents = [];
		this.rasterizedEvents = [];
		this.socket = io.connect('http://drawbeyond.com:81');
		this.socket.on('connect', this.connected);
		this.socket.on('disconnect', this.disconnect);
		this.socket.on('drawSegment', this.connected);
		this.socket.on('rasterize', this.disconnect);
		this.attachEvents();
		this.socket.on('error', function() {
			if(errorFn) {
				errorFn();
			}
		});
	},

	addOnConnected: function(fn) {
		this.connectedEvents.push(fn);
	},

	addOnRasterize: function(fn) {
		this.rasterizedEvents.push(fn);
	},

	addOnDrawSegment: function(fn) {
		this.drawSegmentEvents.push(fn);
	},

	addOnDisconnectEvent: function(fn) {
		this.disconnectEvents.push(fn);
	},

	attachEvents: function() {
		this.socket.on('sectorRasterized', this.sectorRasterized);
		this.socket.on('drawSegment', this.drawSegment);
	},

	drawSegment: function(data) {
		for(var i = 0; i < socket_api.drawSegmentEvents.length; i++) {
			socket_api.drawSegmentEvents[i](data);
		}
	},

	sectorRasterized: function(data) {
		for(var i = 0; i < socket_api.rasterizedEvents.length; i++) {
			socket_api.rasterizedEvents[i](data);
		}
	},

	connected: function() {
		for(var i = 0; i < socket_api.connectedEvents.length; i++) {
			socket_api.connectedEvents[i]();
		}
	},

	disconnect: function() {
		for(var i = 0; i < socket_api.disconnectEvents.length; i++) {
			socket_api.disconnectEvents[i]();
		}
	},

	sendSectorMove: function(data) {
		this.socket.emit('sectorMove', data);
	},

	sendDrawSegment: function(data) {
		this.socket.emit('drawSegment', data);
	}
}

socket_api.init();
