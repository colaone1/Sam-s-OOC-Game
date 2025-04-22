class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  /**
   * a method to produce friendly room description
   * 
   * @returns {string} description of the room
   * @author Neil Bizzell
   * @version 1.0
   */
  describe() {
    return "Looking around the " + this._name + " you can see " + this._description;
  }

  /**
  * a method to add rooms to link rooms to this one
  * it does this by adding them to _linkedRooms
  * 
  * @param {string} direction the direction the other rooom is from this one
  * @param {object} roomToLink the room that is in that direction
  * @author Neil Bizzell
  * @version 1.0
  */
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  /**
   * a method to produce friendly description of linked rooms
   * 
   * @returns {array} descriptions of what rooms are in which direction
   * @author Neil Bizzell
   * @version 1.0
   */
  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }

  /**
   * a method to move the adventurer to a new room
   * 
   * @param {string} direction the direction in which to move
   * @returns {object} the room moved to 
   * @author Neil Bizzell
   * @version 1.1
   */
  //method to move to a new room
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way",);
      alert(this._name)
      return this;
    }
  }
}

class Item {
  constructor(name) {
    this._name = name,
      this._description = ""
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  /**
   * a method to produce friendly item description
   * 
   * @returns {string} description of the item
   * @author Neil Bizzell
   * @version 1.0
   */
  describe() {
    return "The " + this._name + " is " + this._description;
  }


}

class Character {
  constructor(name) {
    this._name = name,
      this._description = ""
    this._conversation = ""
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }
  /**
   * a method to produce friendly character description
   * 
   * @returns {string} description of the character
   * @author Neil Bizzell
   * @version 1.0
   */
  describe() {
    return "You have met " + this._name + ", " + this._name + " is " + this._description;
  }

  /**
   * a method to produce friendly conversation text
   * 
   * @returns {string} the conversation text
   * @author Neil Bizzell
   * @version 1.0
   */
  converse() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name);
    this._weakness = "";
    this._diceChallenge = false;
    this._diceThreshold = 0;
  }

  set weakness(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._weakness = value;
  }

  set diceChallenge(value) {
    this._diceChallenge = value;
  }

  set diceThreshold(value) {
    this._diceThreshold = value;
  }

  /**
   * Rolls a 6-sided die
   * @returns {number} random number between 1 and 6
   */
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * a method to determine the result of fighting an enemy
   * @param {string} item the item used to fight the enemy 
   * @returns {boolean} the result of the fight true = win, false = lose
   */
  fight(item) {
    if (this._diceChallenge) {
      const roll = this.rollDice();
      document.getElementById("textarea").innerHTML += `<br>You roll a ${roll}!`;
      return roll >= this._diceThreshold;
    }
    return item === this._weakness;
  }
}

//create the indiviual room objects and add their descriptions
const Kitchen = new Room("kitchen");
Kitchen.description = "a long narrow room with worktops on either side and a large bench in the middle";
const Lounge = new Room("lounge");
Lounge.description = "a large room with two sofas and a large fire place";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with a pool table at it's centre";
const Hall = new Room("hall");
Hall.description = "a grand entrance hall with large paintings around the walls";

//link the rooms together
Kitchen.linkRoom("south", Lounge);
Kitchen.linkRoom("east", Hall);
Lounge.linkRoom("north", Kitchen);
Lounge.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Lounge);
GamesRoom.linkRoom("north", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Kitchen);

//add characters
const Dave = new Enemy("Dave");
Dave.conversation = "grrr brains";
Dave.description = "a smelly Zombie";
Dave.pronoun = "he";
Dave.weakness = "cheese";

// Create enemies
const dragon = new Enemy('dragon');
dragon.description = "a fearsome dragon with glowing red eyes";
dragon.conversation = "ROAR! I will eat you!";
dragon.weakness = "sword";
dragon.diceChallenge = true;  // This enemy requires a dice roll
dragon.diceThreshold = 4;     // Must roll 4 or higher to win

// add characters to rooms
Kitchen.character = Dave;

// Add player attributes
let playerAttributes = {
  intelligence: 5,
  strength: 5,
  agility: 5,
  charisma: 5
};

function showCharacterCreation() {
  document.getElementById("buttonarea").style.display = "none";
  document.getElementById("textarea").style.display = "none";
  document.getElementById("characterCreation").style.display = "block";
  
  // Add event listeners for sliders
  document.getElementById("intelligence").addEventListener("input", function() {
    document.getElementById("intelligenceValue").textContent = this.value;
    playerAttributes.intelligence = parseInt(this.value);
  });
  
  document.getElementById("strength").addEventListener("input", function() {
    document.getElementById("strengthValue").textContent = this.value;
    playerAttributes.strength = parseInt(this.value);
  });
  
  document.getElementById("agility").addEventListener("input", function() {
    document.getElementById("agilityValue").textContent = this.value;
    playerAttributes.agility = parseInt(this.value);
  });
  
  document.getElementById("charisma").addEventListener("input", function() {
    document.getElementById("charismaValue").textContent = this.value;
    playerAttributes.charisma = parseInt(this.value);
  });
}

/**
 * Subroutine to display information about the current room
 * 
 * @param {object} room the room to be displayed
 * @author Neil Bizzell
 * @version 1.0 
 */
function displayRoomInfo(room) {
  let occupantMsg = ""
  if (room.character === "") {
    occupantMsg = ""
  } else {
    occupantMsg = room.character.describe() + ". " + room.character.converse()
  }

  let textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails().join(" ") + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

/**
 * Subroutine to complete inital game set up then handle commands from the user
 * 
 * @author Neil Bizzell
 * @version 1.0
 */
function startGame() {
  // Hide character creation
  document.getElementById("characterCreation").style.display = "none";
  document.getElementById("textarea").style.display = "block";
  
  // Display initial room
  currentRoom = Kitchen;
  displayRoomInfo(currentRoom);
  
  // Add character attributes to the display
  document.getElementById("textarea").innerHTML += 
    `<br><br>Your character attributes:<br>
    Intelligence: ${playerAttributes.intelligence}<br>
    Strength: ${playerAttributes.strength}<br>
    Agility: ${playerAttributes.agility}<br>
    Charisma: ${playerAttributes.charisma}`;

  // Handle commands
  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else {
        document.getElementById("usertext").value = "";
        alert("that is not a valid command please try again");
      }
    }
  });
}
