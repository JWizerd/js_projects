
// THE VIEW
// the view object will handle displaying whether a ship is Hit, Not Hit (Miss) and will dislplay a message in the top of the window telling us if a ship has been hit or not.

var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};


//THE MODEL:
// the goal of the model object is to handle the placement of the ships, the functionality of the user placing a guess where the ship is located and testing whether or not they guessed the right place on the grid. If the user makes enough hits the model also handles the sinking of the ships. 
var model = {
  boardSize: 7,
  numShips: 5,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
{
  locations: [0, 0, 0],
  hits:["","",""]
},
{
  locations: [0, 0, 0],
  hits:["","",""]
},
{
  locations: [0, 0, 0],
  hits:["","",""]
},
{
  locations: [0, 0, 0],
  hits:["","",""]
},
{
  locations: [0, 0, 0],
  hits:["","",""]
}
],
  fire: function(guess){
    //numShips gives us a control on how many ships need to be iterated through.
    for (var i = 0; i < this.numShips; i++) {
      // ship uses the argument 'guess' to iterate through the 3 arrays of ships. 
      var ship = this.ships[i];
      // index stores the array values within each ship for testing.
      var index = ship.locations.indexOf(guess);
      //this conditional statement test to see if numbers are greater than or equal to zero 'not empty'. If so the location of a ship has been found therefore a "hit".
      if(index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if(this.isSunk(ship)){
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("HAHA You Suck!");
    return false;
  },
  isSunk: function(ship){
    //isSunk iterates through the hits array in ships to see if all hit array values have hit OR is "sunk". If so, the ship is sunk so the function returns true.
    for(var i = 0; i < this.shipLength; i++){
      if(ship.hits[i] !== "hit"){
        return false;
      }
    }
    return true;
  },
  // create random locations for the ships
  generateShipLocations: function(){
    // set a placeholder for ship locations
    var locations;
    for(var i = 0; i < this.numShips; i++){
      // DO generate a ship when the conditiona below is met
      do {
        locations = this.generateShip();
      } while (this.collision(locations)) {
        this.ships[i].locations = locations;
      }
    }
  },
  generateShip: function(){
    // generate number between 1 and 2 NOT 2
    var direction = Math.floor(Math.random() * 2);
    // initalize a row var
    var row;
    // initialize a col var
    var col;
    // if a direction is calculated by direction to be 1 then, generate starting location for a new ship. 
    if(direction === 1){
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
    } else { 
      row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
      col = Math.floor(Math.random() * this.boardSize);
    }
  var newShipLocations = [];
  // add new ship locations vertical if === 1 and horizontal if !== 1
  for(var i = 0; i < this.shipLength; i++){
    if(direction === 1){
      newShipLocations.push(row + "" + (col + i));
    } else {
      newShipLocations.push((row + i) + "" + col);
    }
  }
  return newShipLocations;
},
collision: function(locations){
  // test to see where currently generated ships and make sure they do not collide with one another.
  for(var i = 0; i < this.numShips; i++){
    var ship = model.ships[i];
    for(var j = 0; j < locations.length; j++){
      if(ship.locations.indexOf(location[j]) >= 0){
        return true;
      }
    }
  }
  return false;
}
};

// THE CONTROL:
// the control allows the users to make a guess in the input and will make it so guesses can be converted into hit or misses based off the our model. 
// the model also keeps track of the number of guesses and determine whether the game is over (IF all ships are sunk the game is over).

var control = {
  // sets initial guesses to zero 
  guesses: 0,
  //the parseGuess function will check to see if the number entered is in the right format (not too long, short or null). 
  // take the letter and convert it the corresponding row number (A3 = 03) 
  // check that each number is between 0 and 6 (board size)
  // check for null value. IF not null concatinate the numbers into a string and return the string. 
  processGuess: function(guess){
    // use parse guess to validate input 
    var location = parseGuess(guess);

    if(location){
      //if the location is validated through parseGuess add 1 to the guesses.
      this.guesses++;
      // fire [either hit or miss] on grid location.
      var hit = model.fire(location);
      if(hit && model.shipsSunk === model.numShips){
        view.displayMessage("You sank all my battleships in " + this.guesses + " " + guesses);
      }
    }
  },
};

// helper function to parse a guess from the user

function parseGuess(guess){
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if(guess === null || guess.length !== 2){ // test to see if user input is not greater or smaller than 2 characers and if it isn't empty
    alert("please enter a valid letter and number on the board");
  } else {
    // find single character (charAt) and store it to firstChar
    var firstChar = guess.charAt(0);
    // search alphabet array for firstChar and then store the index of that char to row. [it stores an integer]
    var row = alphabet.indexOf(firstChar);
    //store second character to column [this should already be an integer]
    var column = guess.charAt(1);
    // if both row and column are not numbers return alert message
    if(isNaN(row) || isNaN(column)){
      alert("oops that isn't on the board. Try Again.");
    // if row and column size are greater than boardsize return an alert msg
    } else if(row < 0 || row >= model.boardsize || column < 0 || column >= model.boardsize){
      alert("oops, that's off the board!");
    } else {
      //if all passes return the row + column as one double digit integer;
      return row + column;
    }
  }   
  return null;
}
function init(){
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeypress;
  model.generateShipLocations();
}
function handleFireButton(){
  // takes the onclick handler above, stores and validates user input using control.processGuess. Then resets the input back to empty for re-use.
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  control.processGuess(guess);
  guessInput.value = "";
}
window.onload = init;

function handleKeypress(e){
  var fireButton = document.getElementById("fireButton");
  if(e.keyCode === 13){
    fireButton.click();
    return false;
  } 
}

//////////////// BULLET POINTS /////////////////////

// We use HTML to build the structure of the Battleship game, CSS to style it, and JavaScript to create the behavior. 

//The id of each < td > element in the table is used to update the image of the element to indicate a HIT or a MISS. 

//The form uses an input with type “button”. We attach an event handler to the button so we can know in the code when a player has entered a guess. 

//To get a value from a form input text element, use the element’s value property. CSS positioning can be used to position elements precisely in a web page. 

//We organized the code using three objects: a model, a view, and a controller. 

//Each object in the game has one primary responsibility. 

//The responsibility of the model is to store the state of the game and implement logic that modifies that state. 

//The responsibility of the view is to update the display when the state in the model changes. 

//The responsibility of the controller is to glue the game together, to make sure the player’s guess is sent to the model to update the state, and to check to see when the game is complete. 

//By designing the game with objects that each have a separate responsibility, we can build and test each part of the game independently. 

//To make it easier to create and test the model, we initially hardcoded the locations of the ships. After ensuring the model was working, we replaced these hardcoded locations with random locations generated by code. 

//We used properties in the model, like numShips and shipLength, so we don’t hardcode values in the methods that we might want to change later. 

//Arrays have an indexOf method that is similar to the string indexOf method. The array indexOf method takes a value, and returns the index of that value if it exists in the array, or -1 if it does not. 

//With chaining, you can string together object references (using the dot operator), thus combining statements and eliminating temporary variables.

// The do while loop is similar to the while loop, except that the condition is checked after the statements in the body of the loop have executed once. 

//Quality assurance (QA) is an important part of developing your code. QA requires testing not just valid input, but invalid input as well.

// Freeman, Eric T.; Robson, Elisabeth (2014-03-26). Head First JavaScript Programming (Kindle Locations 5704-5722). O'Reilly Media. Kindle Edition. 

