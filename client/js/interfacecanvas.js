var InterfaceCanvas = function (game) {

  this.game = game;
  this.windowTouchy = new Touchy(0, 0, window.innerWidth, window.innerHeight);
  this.bounds = [];
  this.heightScene = this.game.canvas.height; 
  this.widthScene = this.game.canvas.width; 
  this.buttonWidth = this.widthScene/5; 
  this.buttonHeight = this.heightScene/5;

  this.infoButton = null;
  this.sliderButton = null;  
  this.optionButton = null;  
  this.slider  = null; 

  this.init();
  this.listen();  
}

InterfaceCanvas.prototype = {
  init: function() {


  
    this.sliderButton = new Sprite();
    this.sliderButton.setFill("#8aac25");
    this.sliderButton.setPosition(this.buttonWidth,this.heightScene-this.buttonHeight);
    this.sliderButton.setSize(this.buttonWidth*3,this.buttonHeight);
   
    this.optionButton = new Sprite();
    this.optionButton.setFill("#303e04");
    this.optionButton.setPosition(this.buttonWidth*4,this.heightScene-this.buttonHeight);
    this.optionButton.setSize(this.buttonWidth,this.buttonHeight);
     
    this.bounds.push(this.infoButton);
    this.bounds.push(this.sliderButton);  
    this.bounds.push(this.optionButton);   

    //this.slider = new Slider(contextXX,  this.heightScene-this.buttonWidth/2, this.widthScene/2,300,40);
    //this.slider.setPosition(0.8);//put percentage here;

    
  },
  listen: function() {


/*    this.game.canvas.addEventListener('touchstart', function(e) {
        
      var touchX = e.changedTouches[0].pageX;
      var touchY = e.changedTouches[0].pageY;        
      if(this.windowTouchy.isInBounds(
        this.infoButton.this.getPosition()[0] + "_" + this.infoButton.getPosition()[1] + "_" + this.infoButton.this.getPosition()[0] + this.infoButton.getSize()[0] + "_" + this.infoButton.getPosition()[1] + this.infoButton.getSize()[1],
        touchX,
        touchY
      )){
        console.log("Touched")
      }


      
      that.addPoint(new Coordonates(touchX, touchY));          
      
    });*/
    var that = this;
    this.game.canvas.addEventListener('mousedown', function(e) {

      var touchX = e.pageX;
      var touchY = e.pageY;
      if(that.windowTouchy.isInBounds(that.infoButton.getBound(),touchX,touchY)){
        console.log("infoButton touched")
      } 
      if(that.windowTouchy.isInBounds(that.optionButton.getBound(),touchX,touchY)){
        console.log("optionButton touched")
      }       

    });       

  },
  render: function() {
    //slider.reDraw();
    var i;
    for (i = 0; i < this.bounds.length; i++){    
      this.bounds[i].draw(this.game.context);
    }
  },
}


