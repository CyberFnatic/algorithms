/*
Title:          Recursive Backtracker
Description:    Algorithm for generating mazes
Author:         Teemu Pätsi
Date:           17th of December 2018
Version:        1.1.0
Source:         https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
Change log:
    24th of December: Program now displays correct maze route after generating the maze
*/

var w = 400;
var h = 400;

// Cell width & height
var side = 20;

// Cell's location in grid
var i = Math.floor(w / side);
var j = Math.floor(h / side);

// Change currentNum to change starting point
var currentNum = Math.floor(Math.random() * (i*j-1));

// Current cell
var current;

// Store cell objects
var cells = [];
var unvisitedCells = (w/side) * (h/side);

// Stack of previously visited cells
var stack = [];

function Cell() {

  this.width = side;
  this.height = side;
  this.col;
  this.row;

  this.visited = false;
  this.wrong_route = false;
  this.begin = false;

  // Top, Right, Bottom, Left [TRBL]
  this.walls = [true, true, true, true];
  this.neighbours = [true, true, true, true];

  // Prints cell with its walls
  this.display = function() {

    // x and y coordinates from where to draw rects and lines
    var x = this.col*side;
    var y = this.row*side;
	  	  
    if (this.visited) {
      noStroke();
      fill('rgba(180,170,170,120)');
      rect(x, y, side, side);
    }

    // Draw start cell with different color
    if (this.begin) {
      noStroke();
      fill('rgba(20,240,20,100)');
      rect(x, y, side, side);
    }

    // Draws cell's walls
    this.drawOutline(x, y);
  }
  
  this.show_route = function() {
  
    var x = this.col*side;
    var y = this.row*side;

    // Draw visited cells with different color
    if (this.wrong_route && this.visited) {
      noStroke();
      fill('rgb(240, 10, 10)');
      rect(x, y, side, side);
    }
    
    this.drawOutline(x, y);
  }

  this.drawOutline = function(x, y) {

    stroke(255);

    // Draw walls around cell where needed 
    if (this.walls[0]) {
      line(x, y, x+side, y);
    }
    if (this.walls[1]) {
      line(x+side, y, x+side, y+side);
    }
    if (this.walls[2]) {
      line(x+side, y+side, x, y+side);
    }
    if (this.walls[3]) {
      line(x, y+side, x, y);
    }
  }

  // Return random neighbour
  this.getRandomNeighbour = function() {
    // Get all neighbours
    var neighs = getNeighsArray(this);

    // Test if neighbours are already visited
    if (neighs.includes(0)) {
      if (cells[currentNum - i].visited) {
        neighs.splice(neighs.indexOf(0),1);
      }
    }
    if (neighs.includes(1)) {
      if (cells[currentNum + 1].visited) {
        neighs.splice(neighs.indexOf(1),1);
      }
    }
    if (neighs.includes(2)) {
      if (cells[currentNum + i].visited) {
        neighs.splice(neighs.indexOf(2),1);
      }
    }
    if (neighs.includes(3)) {
      if (cells[currentNum - 1].visited) {
        neighs.splice(neighs.indexOf(3),1);
      }
    }

    // Returns 0, 1, 2 or 3 (T, R, B, L)
    return rand = neighs[Math.floor(Math.random() * neighs.length)];
  }
  
  // Checks if cell is located at the edge of grid
  this.isEdgeCell = function() {
  
    // TRBL
    if (this.row === 0) {
      this.neighbours[0] = false;
    }
    if (this.col === i-1 ) {
      this.neighbours[1] = false;
    }
    if (this.row === j-1) {
      this.neighbours[2] = false;
    }
    if (this.col === 0) {
      this.neighbours[3] = false;
    }
  }
}

// Gets array of neighbours (TRBL, 0 being Top and 3 being Left)
function getNeighsArray(current) {
  var neighs = [];
  for (var i = 0; i < current.neighbours.length; i++) {
    if (current.neighbours[i]) {
      neighs.push(i);
    }
  }

  return neighs;
}

// Returns cell which is going to be the next one
function getChosenCell(next) {

  // T, R, B, L
  if (next === 0) {
    chosen = cells[currentNum - i];
    currentNum -= i;
  }
  if (next === 1) {
    chosen = cells[currentNum + 1];
    currentNum += 1;
  }
  if (next === 2) {
    chosen = cells[currentNum + i];
    currentNum += i;
  }
  if (next === 3) {
    chosen = cells[currentNum - 1];
    currentNum -= 1;
  }
  return chosen;
}

// Removes walls between current and next cell
function removeWalls(next) {

  // T, R, B, L
  if (next === 0) {
    current.walls[0] = false;
    chosen.walls[2] = false;
  }
  if (next === 1) {
    current.walls[1] = false;
    chosen.walls[3] = false;
  }
  if (next === 2) {
    current.walls[2] = false;
    chosen.walls[0] = false;
  }
  if (next === 3) {
    current.walls[3] = false;
    chosen.walls[1] = false;
  }
}

// Tests if all neighbours are visited
function allNeighboursVisited(currentNum) {
  
  if ((currentNum+1) % i != 0) {
    if (!cells[currentNum+1].visited) {
      return false;
    }
  }

  if (currentNum+i < i*j) {
    if (!cells[currentNum+i].visited) {
      return false;
    }
  }
  if ((currentNum-1) % i != i-1 && currentNum-1 >= 0) {
    if (!cells[currentNum-1].visited) {
      return false;
    }
  }
  if (currentNum-i >= 0) {
    if (!cells[currentNum-i].visited) {
      return false;
    }
  }

  return true;
}

function setup() {
  createCanvas(w, h);
  frameRate(40);

  for (var row = 0; row < j; row++) {
    for (var col = 0; col < i; col++) {
      var cell = new Cell();
      cell.row = row;
      cell.col = col;

      cell.isEdgeCell();
      cells.push(cell);
    }
  }

  // Mark current cell as begin cell
  current = cells[currentNum];
  current.begin = true;
}

function draw() {

  background(20);

  // Mark current as visited and display walls for cells
  current.visited = true;

  // Display each cell and it's walls
  cells.forEach(cell => {
    cell.display();
  });

  // Display current cell with different color
  noStroke();
  fill('rgb(255, 123, 100)');
  rect(current.col*side, current.row*side, side, side);
  current.drawOutline(current.col*side, current.row*side);

  // While there are unvisited cells
  if (unvisitedCells > 1) {
    if (!allNeighboursVisited(currentNum)) {

    // Step 1 --> Choose randomly one of the unvisited neighbours
    var next = current.getRandomNeighbour();
    var chosen = getChosenCell(next);

    // Step 2 --> Push the current cell to the stack
    stack.push(current);

    // Step 3 --> Remove the wall between the current cell and the chosen cell
    removeWalls(next);

    // Step 4 --> Make the chosen cell the current cell and mark it as visited
    current = chosen;
    unvisitedCells--;
    }

    // Else if stack is not empty
    else if (stack.length > 0) {
	
	  // Cell will be painted red when wrong_route = true
	  current.wrong_route = true;

      // Pop a cell from the stack
      current = stack.pop();

      // Make it the current cell
      currentNum = current.row * i + current.col;
    }
  }

  // Stop loop when maze is ready
  else {
    cells.forEach(cell => {
        cell.show_route();
    })
    console.log("Ready!");
    noLoop();
  }
}
