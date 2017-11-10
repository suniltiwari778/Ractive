 var ractive;

 (function(){
	
  'use strict';
  
  //Creating the instance of RactiveJS and providing my end point here that I will use later for getting button and bar values
  ractive = new Ractive({
  el:'#mainBarContainer',
  template: '#template',
  data: {
		"buttons": [
			10,
			38,
			-13,
			-18
		],
		"bars": [
			62,
			45,
			62
		],
		"limit": 130,
		activebar:0,
		progressbarMin:0
		
	}
});

/*The main logic to handle changes in progress bar. I have first calculated the offset value that will chagnge in percent of existing value of bar.
 Then get the index of bar which is going to be modified.
*/
 ractive.on( 'updateProgress', function (event) {
		 var index = event.node.getAttribute( 'data-index' );
		 var progressbarChangePercent = parseInt(index);
		 var activebarseq = this.get("activebar");
	     var progressbarModifiedValue = parseInt(this.get("bars."+activebarseq))+ progressbarChangePercent;
    	 var progressbarMin = this.get("progressbarMin"); 
			 
		 if(progressbarModifiedValue < progressbarMin) {
                this.set("bars."+activebarseq, progressbarMin);
            }else if(progressbarModifiedValue > this.get("limit" )){
				this.set("bars."+activebarseq, this.get("limit" ));
			}else {
                this.set("bars."+activebarseq, progressbarModifiedValue);
            }
		  
	
	});
}());