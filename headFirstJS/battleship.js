
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
  locations: ["10", "20", "30"],
  hits:["","",""]
},
{
  locations: ["32", "33", "34"],
  hits:["","",""]
},
{
  locations: ["63", "64", "65"],
  hits:["","","hit"]
},
{
  locations: ["21", "22", "23"],
  hits:["","",""]
},
{
  locations: ["45", "46", "47"],
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
    var location = processGuess(location);
    
  },
};



