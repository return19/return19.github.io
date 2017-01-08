
function createTypingEffect(elementList,stringList,period){
	this.curPos=0; // current position of the character the type will print or delete
	this.elementList = elementList; // the HTML element to be typed in
	this.elementIndex = 0;
	this.stringToRotate = stringList[0];
	this.stringLength = this.stringToRotate.length;
	this.period = period; // Typing Speed
	this.isDeleting = false; // Whether the curPos character will be typed or deleted in next type() call
	this.curStringIndex = 0; // Index of current string in stringList
	this.stringList = stringList; // List of strings to be rotated one by one
	this.stringListLength = this.stringList.length;

	this.isStopTriggered = false; // Set to true if user wants to stop typing
}

createTypingEffect.prototype.switchNextString = function(){
	
	if(this.elementIndex == this.elementList.length -1){
		// Element list exhausted, then stop typing
		this.stopType();
	} else {
		this.curStringIndex = (this.curStringIndex+1)%(this.stringListLength);
		this.stringToRotate = this.stringList[this.curStringIndex];
		this.stringLength = this.stringToRotate.length;
		this.curPos = 0;
		// Jump to next element
		this.elementIndex++;
	}
}

createTypingEffect.prototype.startType = function(){
	this.type();
}

createTypingEffect.prototype.stopType = function(){
	this.isStopTriggered = true;
	postTypingEffect();
}

createTypingEffect.prototype.type = function(){
	var text;
	var extraDelay = 0;

	// Adding characters
	if(!this.isDeleting){
		text = this.stringToRotate.substring(0,this.curPos+1);
		this.curPos++;
	} else { // should not be triggered in this website
		text = this.stringToRotate.substring(0,this.curPos-1);
		this.curPos--;
	}

	this.elementList.eq(this.elementIndex).html(text);

	if(this.curPos == this.stringLength){
		this.switchNextString();
		// this.isDeleting = true;
		// this.curPos = this.stringLength-1;
		extraDelay = 100; // default 100
	} else if (this.curPos < 0){
		this.isDeleting = false;
		this.curPos = 0;
		this.switchNextString();
	}
	var that = this;
	if(!this.isStopTriggered){ // If stop not triggered then go on
		setTimeout(function(){
			that.type();
		},this.period+extraDelay);
	}
}

function postTypingEffect(){
	var decreaseTop = 0.04*($('#title_box').height());

	$("#see_more_button").animate({
		opacity: "+=1",
		'margin-top': "-=" + decreaseTop+"px"},
		500, function() {
		/* stuff to do after animation is complete */
	});
}

$(document).ready(function() {
	var typingEffectElements = $(".typing_effect");
	var stringList = [];
	for(var i=0;i<typingEffectElements.length;i++){
		stringList[stringList.length] = 
			typingEffectElements.eq(i).attr("data-string");
	}

	console.log(stringList);

	var typingEffect = new createTypingEffect(typingEffectElements,stringList,70); // default speed 70
	typingEffect.startType();

	
	// for (var i = 0; i < typingEffectElements.length; i++) {

	// 	var element = typingEffectElements.eq(i);

	// 	var stringToRotate = JSON.parse(element.attr("data-strings")); 
	// 	var period = Number(element.attr("data-period"));
	// 	console.log(stringToRotate + " " + period);

		
	// 	var typingEffect = new createTypingEffect(element,stringToRotate,period);
	// 	typingEffect.startType();
	// }
});