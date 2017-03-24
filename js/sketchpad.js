
var $square = "<div class='square'></div>";

$(function(){
	var $grid = $('.grid');
	var gridSize = parseInt($(':input[type="number"]').val());
	console.log(gridSize);
	addSquares(Math.pow(gridSize, 2));
	setSquareSize(gridSize);
	
	$('.clear').click(function(){
		$('.square').css("background-color", "white");
	});
	
	$('.square').mouseenter(function(){
		console.log("Mouse enters");
		$(this).css("background-color", '#'+Math.random().toString(16).slice(-6));
	});
	
	$('#size_selector').on("change paste keyup", function(){
		var newSize = parseInt($(this).val());
		resizeGrid(newSize, gridSize);
		gridSize = newSize;
		console.log(gridSize);
	});
	
});

$(document).on('mouseenter', '.square', function(){
	console.log("Mouse enters");
	$(this).css("background-color", '#'+Math.random().toString(16).slice(-6));
});

/**
Fills the grid with divs. The number of divs is the the gridSize pow 2 (default = 10).
*/
function addSquares(numberOfSquares){
	//append new squares.
	for (i=0; i < numberOfSquares; i++){
		$('.grid').append($square);
		console.log("grid: ");
	}
}

function resizeGrid(newGridSize, gridSize) {
	setSquareSize(newGridSize)
	var squaresToAdd = Math.pow(newGridSize, 2) - Math.pow(gridSize, 2);
	addSquares(squaresToAdd);
	setSquareSize(newGridSize);
}

function setSquareSize(gridSize){
	//square height and width determined by the grid's size.
	var squareHeight = $('.grid').height()/gridSize.toString();
	var squareWidth = $('.grid').width()/gridSize.toString();
	$('.square').css({height: squareHeight + "px", width: squareWidth + "px"});
}