function Cell(i, j, w) { // i,j: index of the cell, w:size of the cell
	
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.neighbourCount = 0;

	this.bee = false; // no bees in the cells here, only random function sets them under the setup method
	this.revealed = false; 
}

// .prototype adds a new property show to every Cell object (JS's OOP constructor)
Cell.prototype.show = function() {

	stroke(0); // black colored border of cells
	noFill(); // always draw a no filled cell

	rect(this.x, this.y, this.w, this.w); // x,y,width,height of rectangle

	if(this.revealed) {
		if (this.bee) {
			stroke(0);
			fill(127);
			ellipse(this.x +  this.w*0.5, this.y + this.w*0.5 , this.w*0.5);
		} else {
			fill(233,244,0);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighbourCount != 0) {
				textAlign(CENTER);
				fill(0);
				text(this.neighbourCount, this.x + this.w*0.5, this.y + this.w*0.7);
			   }
	    }
	}
}

// count no. of neighbours of a bee
Cell.prototype.countBees = function() {
	if(this.bee) {
		this.neighbourCount = -1;
		return;
	} 

	var total = 0;
	for (var xoffset = -1; xoffset <= 1; xoffset++) {
		for (var yoffset = -1; yoffset <= 1; yoffset++) {
			var i = this.i + xoffset;
			var j = this.j + yoffset;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbour = grid[i][j];
				if (neighbour.bee) {
					total++;
				}				
			}

		}
	}
	this.neighbourCount = total;
}


// check if cell contains the mouse cursor
Cell.prototype.contains = function(x, y) {

	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

// reveal the cell
Cell.prototype.reveal = function () {
	this.revealed = true;
	if (this.neighbourCount == 0  ) { // when a cell has no bees as neighbour(text=0)
		// reveal adjacent cells also (flood fill time)
		this.floodfill();
	}
}

Cell.prototype.floodfill = function () {
	for (var xoffset = -1; xoffset <= 1; xoffset++) {
		for (var yoffset = -1; yoffset <= 1; yoffset++) {
			var i = this.i + xoffset;
			var j = this.j + yoffset;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbour = grid[i][j];
				if (!neighbour.bee && !neighbour.revealed) {
					neighbour.reveal();
				}				
			}

		}
	}
}