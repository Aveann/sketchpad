
var $squares = "<div class='squares'></div>";
var rainbow = true;
var color = "black";

$(function(){
	var gridSize = parseInt($(':input[type="number"]').val());
	
	addSquares(Math.pow(gridSize, 2));
	setSquareSize(gridSize);
	
	/*--EVENTS--*/
	$('.clear').click(function(){
		$('.squares').css("background-color", "white");
	});
	
	$('#size').on("change paste keyup", function(){
		var newSize = parseInt($(this).val());
		if (newSize > 100) {
			newSize = 100;
			$(this).text('100');
		}
		resizeGrid(newSize, gridSize);
		gridSize = newSize;
	});
	
	
	$('.colors').click(function(){
		color = $(this).css("background-color");
		console.log(color);
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
Fills the grid with divs. The number of divs is the the gridSize pow 2 (default = 10).
*/
function addSquares(numberOfSquares){
	//append new squares.
	for (i=0; i < numberOfSquares; i++){
		$('.grid').append($squares);
	}
}

function resizeGrid(newGridSize, gridSize) {
	setSquareSize(newGridSize)
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

function setSquareSize(gridSize){
	//square height and width determined by the grid's size.
	var squareHeight = $('.grid').height()/gridSize.toString();
	var squareWidth = $('.grid').width()/gridSize.toString();
	$('.squares').css({height: squareHeight + "px", width: squareWidth + "px"});
}