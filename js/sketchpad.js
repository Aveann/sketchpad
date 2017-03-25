
var $squares = "<div class='squares'></div>"; //the square to add
var color = ""; //the color of the squares
var rainbow = true; //if rainbow is true, squares are colored with random colors.

$(function(){
	//the size of the grid is determined by the value of the input (default = 10).
	var gridSize = parseInt($(':input[type="number"]').val());
	
	addSquares(Math.pow(gridSize, 2)); //fill grid with squares
	setSquareSize(gridSize); //resize the squares.
	
	/*--EVENTS--*/
	
	//clear button clicked
	$('.clear').click(function(){
		$('.squares').css("background-color", "white");
	});

	//size changed
	$('#size').on("change paste keyup", function(){
		var newSize = parseInt($(this).val());
		if (newSize > 100) {
			newSize = 100;
			$(this).text('100');
		}
		resizeGrid(newSize, gridSize);
		gridSize = newSize;
	});
	
	//color clicked
	$('.colors').click(function(){
		color = $(this).css("background-color");
		console.log(color);
		//if the "rainbow" color is selected, the background-color is "rgba(0, 0, 0, 0)" since
		//it is the default value.
		if (color === "rgba(0, 0, 0, 0)"){
			rainbow = true;
		} else {
			rainbow = false;
		}
	});
	

});

$(document).on('mouseenter', '.squares', function(){
	console.log(color);
	if(rainbow){
		$(this).css("background-color", '#' + Math.random().toString(16).slice(-6));
	} else {
		$(this).css("background-color", color);
	}
	
});

/**
Fills the grid with squares. The number of squares is the grid ^2.
*/
function addSquares(numberOfSquares){
	//append new squares.
	for (i=0; i < numberOfSquares; i++){
		$('.grid').append($squares);
	}
}

/**
Resize the grid with a newGridSize from the input and add squares if the size
is larger than the current size.
If a size has already been entered in the past and squares have already been added,
the function just resizes the grid. This makes things faster.
*/
function resizeGrid(newGridSize, gridSize) {
	if(newGridSize > gridSize){
		var numberOfSquaresToHave = Math.pow(newGridSize,2);
		var existingNumberOfSquares = $('.squares').length;
		//check if the number of squares to add already exist.
		if( numberOfSquaresToHave > existingNumberOfSquares ){
			var squaresToAdd = numberOfSquaresToHave - existingNumberOfSquares;
			addSquares(squaresToAdd);
		}
	}	
	setSquareSize(newGridSize);
}

/**
Sets the height and width of squares according to the grid Size.
*/
function setSquareSize(gridSize){
	//square height and width determined by the grid's size.
	var squareHeight = $('.grid').height()/gridSize.toString();
	var squareWidth = $('.grid').width()/gridSize.toString();
	$('.squares').css({height: squareHeight + "px", width: squareWidth + "px"});
}