// The Coding Train https://www.youtube.com/watch?v=LFU5ZlrR21E

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

// Global Variables
var grid;
var cols;
var rows;
var w = 50; // width of a cell in px

var totalBees = 20; // fixed no of bees for the game

function setup() {
	createCanvas(501, 501);
	cols = floor(width / w); 
	rows = floor(height / w);
	grid = make2DArray(cols, rows); // game board
	for (var i = 0; i < cols; i++) { // initialising cells on the game board
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w); // x,y,size
		}
	}

	// pick random spots/cells for bees
	var options = []; // array of all possible options for bees' positions
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i,j]);
		}
	}
	for (var n = 0; n < totalBees; n++) { // selecting unique position for every bee
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// deletes the selected index from options array so that no two bees have same location
		options.slice(index, 1);
		grid[i][j].bee = true;
	}


	for (var i = 0; i < cols; i++) { // count the neighbours each time
		for (var j = 0; j < rows; j++) {
			grid[i][j].countBees(); // x,y,size
		}
	}
}

function draw() {
	background(255); // white color background (board)
	for (var i = 0; i < cols; i++) {
		for (var j= 0; j < rows; j++) {
		grid[i][j].show();
	}
}
}

// p5.js inbuilt function mousePressed() 
function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();

				if (grid[i][j].bee == true) {
					gamoOver();
				}
			}
		}
	}
}

function gamoOver () {
	for (var i = 0; i < cols; i++) {
		for (var j= 0; j < rows; j++) {
		grid[i][j].revealed = true;
   	}
  }
}