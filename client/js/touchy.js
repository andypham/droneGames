	var Touchy = function() {
		var touchy = this;
		this.touchStarted = false;
		this.screenWidth = window.innerWidth;
		this.screenHeight = window.innerHeight;
		this.listenFns = {};

		this.listen = function(bounds, fn) {
			this.listenFns[bounds.x1 + '_' + bounds.y1 + '_' + bounds.x2 + '_' + bounds.y2] = fn;
		}

		this.isInBounds = function(bounds, touchX, touchY) {
			var verts = bounds.split('_');
			var x1 = verts[0];
			var y1 = verts[1];
			var x2 = verts[2];
			var y2 = verts[3];
			return (touchY >= y1 && touchY <= y2) && (touchX >= x1 && touchX <= x2);
		}

		window.document.addEventListener('touchmove', function(e) {
			var touchX = e.changedTouches[0].pageX;
			var touchY = e.changedTouches[0].pageY;
			for(x in touchy.listenFns) {
				if(touchy.isInBounds(x, touchX, touchY)) {
					touchy.listenFns[x]({
						x: touchX,
						y: touchY
					}, 'touchmove', e);
				}
			}
		});
		window.document.addEventListener('touchstart', function(e) {
			var touchX = e.changedTouches[0].pageX;
			var touchY = e.changedTouches[0].pageY;
			for(x in touchy.listenFns) {
				if(touchy.isInBounds(x, touchX, touchY)) {
					touchy.listenFns[x]({
						x: touchX,
						y: touchY
					}, 'touchstart', e);
				}
			}
		});
		window.document.addEventListener('touchend', function(e) {
			var touchX = e.changedTouches[0].pageX;
			var touchY = e.changedTouches[0].pageY;
			for(x in touchy.listenFns) {
				if(touchy.isInBounds(x, touchX, touchY)) {
					touchy.listenFns[x]({
						x: touchX,
						y: touchY
					}, 'touchend', e);
				}
			}
		});
		window.document.addEventListener('mousemove', function(e) {
			if(touchy.touchStarted) {
				var touchX = e.pageX;
				var touchY = e.pageY;
				for(x in touchy.listenFns) {
					if(touchy.isInBounds(x, touchX, touchY)) {
						touchy.listenFns[x]({
							x: touchX,
							y: touchY
						}, 'touchmove', e);
					}
				}
			}
		});
		window.document.addEventListener('mousedown', function(e) {
			touchy.touchStarted = true;
			var touchX = e.pageX;
			var touchY = e.pageY;
			for(x in touchy.listenFns) {
				if(touchy.isInBounds(x, touchX, touchY)) {
					touchy.listenFns[x]({
						x: touchX,
						y: touchY
					}, 'touchstart', e);
				}
			}
		});
		window.document.addEventListener('mouseup', function(e) {
			touchy.touchStarted = false;
			var touchX = e.pageX;
			var touchY = e.pageY;
			for(x in touchy.listenFns) {
				if(touchy.isInBounds(x, touchX, touchY)) {
					touchy.listenFns[x]({
						x: touchX,
						y: touchY
					}, 'touchend', e);
				}
			}
		});
	}

	// var touchy = new Touchy();
	// touchy.listen(
	// 	{
	// 		x1: 100,
	// 		y1: 100,
	// 		x2: 800,
	// 		y2: 800
	// 	},
	// 	function(e, eventType) {
	// 		console.log(eventType);
	// 	}
	// );