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
    if (this._name === "kitchen") {
      return this._description;
    }
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
Kitchen.description = "You wake up in a dimly lit room, stone slabs covering the floor and grey bricks for walls, all degrading as if they've been there for a hundred years or more. The light is coming from outside the room, just past a barred door, the only way in or out of it... Is this a dungeon?";
const Lounge = new Room("lounge");
Lounge.description = "a large room with two sofas and a large fire place";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with a pool table at it's centre";
const Hall = new Room("hall");
Hall.description = "a grand entrance hall with large paintings around the walls";

//link the rooms together
// Kitchen.linkRoom("south", Lounge);  // Removing this connection
// Kitchen.linkRoom("east", Hall);     // Removing this connection
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
// Kitchen.character = Dave;  // Removing this line to remove Dave from the Kitchen

// Add player attributes
let playerAttributes = {
  intelligence: 5,
  strength: 5,
  agility: 5,
  charisma: 5
};

let totalPoints = 10;
let baseValue = 5;

// Add inventory array at the top with other variables
let inventory = [];

// Add at the top with other variables
let previousState = null;

function updateRemainingPoints() {
  const totalUsed = Object.values(playerAttributes).reduce((sum, value) => sum + (value - baseValue), 0);
  const remaining = totalPoints - totalUsed;
  document.getElementById("remainingPoints").textContent = remaining;
  
  // Remove the disabled state and title changes
  const beginButton = document.getElementById("beginButton");
  beginButton.disabled = false;
  beginButton.title = "Click to begin your adventure!";
}

function showCharacterCreation() {
  document.getElementById("buttonarea").style.display = "none";
  document.getElementById("textarea").style.display = "none";
  document.getElementById("characterCreation").style.display = "block";
  
  // Reset attributes to base value
  playerAttributes = {
    intelligence: baseValue,
    strength: baseValue,
    agility: baseValue,
    charisma: baseValue
  };
  
  // Reset sliders to base value
  document.getElementById("intelligence").value = baseValue;
  document.getElementById("strength").value = baseValue;
  document.getElementById("agility").value = baseValue;
  document.getElementById("charisma").value = baseValue;
  
  // Update displayed values
  document.getElementById("intelligenceValue").textContent = baseValue;
  document.getElementById("strengthValue").textContent = baseValue;
  document.getElementById("agilityValue").textContent = baseValue;
  document.getElementById("charismaValue").textContent = baseValue;
  
  // Add event listeners for sliders
  document.getElementById("intelligence").addEventListener("input", function() {
    const newValue = parseInt(this.value);
    const oldValue = playerAttributes.intelligence;
    const pointChange = newValue - oldValue;
    
    if (pointChange > 0 && (totalPoints - getTotalPointsUsed() + (oldValue - baseValue)) < pointChange) {
      this.value = oldValue;
      return;
    }
    
    playerAttributes.intelligence = newValue;
    document.getElementById("intelligenceValue").textContent = newValue;
    updateRemainingPoints();
  });
  
  document.getElementById("strength").addEventListener("input", function() {
    const newValue = parseInt(this.value);
    const oldValue = playerAttributes.strength;
    const pointChange = newValue - oldValue;
    
    if (pointChange > 0 && (totalPoints - getTotalPointsUsed() + (oldValue - baseValue)) < pointChange) {
      this.value = oldValue;
      return;
    }
    
    playerAttributes.strength = newValue;
    document.getElementById("strengthValue").textContent = newValue;
    updateRemainingPoints();
  });
  
  document.getElementById("agility").addEventListener("input", function() {
    const newValue = parseInt(this.value);
    const oldValue = playerAttributes.agility;
    const pointChange = newValue - oldValue;
    
    if (pointChange > 0 && (totalPoints - getTotalPointsUsed() + (oldValue - baseValue)) < pointChange) {
      this.value = oldValue;
      return;
    }
    
    playerAttributes.agility = newValue;
    document.getElementById("agilityValue").textContent = newValue;
    updateRemainingPoints();
  });
  
  document.getElementById("charisma").addEventListener("input", function() {
    const newValue = parseInt(this.value);
    const oldValue = playerAttributes.charisma;
    const pointChange = newValue - oldValue;
    
    if (pointChange > 0 && (totalPoints - getTotalPointsUsed() + (oldValue - baseValue)) < pointChange) {
      this.value = oldValue;
      return;
    }
    
    playerAttributes.charisma = newValue;
    document.getElementById("charismaValue").textContent = newValue;
    updateRemainingPoints();
  });
  
  updateRemainingPoints();
}

function getTotalPointsUsed() {
  return Object.values(playerAttributes).reduce((sum, value) => sum + (value - baseValue), 0);
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
    occupantMsg + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  
  // Add continue button
  if (room === Kitchen) {  // Only show on the starting room
    document.getElementById("buttonarea").innerHTML = '<button class="btn btn-primary" onclick="showDirections()">Continue</button>';
  } else {
    document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
    document.getElementById("usertext").focus();
  }
}

// Add new function to show directions after clicking continue
function showDirections() {
  previousState = document.getElementById("textarea").innerHTML;
  document.getElementById("textarea").innerHTML = "<p style='text-align: center;'>1. Look around</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. Investigate the lightsource</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
  document.getElementById("usertext").focus();
  
  // Remove any existing event listeners
  document.removeEventListener("keydown", handleCommand);
  
  // Add new event listener
  document.addEventListener("keydown", handleCommand);
}

// Create a separate function to handle commands
function handleCommand(event) {
  if (event.key === "Enter") {
    const command = document.getElementById("usertext").value.toLowerCase().trim();
    
    if (command === "look around" || command === "1" || command === "1.") {
      previousState = document.getElementById("textarea").innerHTML;
      document.getElementById("textarea").innerHTML = "<p>You look around the room, nothing but cold, hard stone and the barred door where the light is coming from</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-decoration: underline; text-align: center;'>Do you?</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Investigate the lightsource</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. Continue looking (6+ intelligence required)</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'inventory' to check your items)</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
    } else if (command === "investigate the lightsource" || command === "2" || command === "2.") {
      previousState = document.getElementById("textarea").innerHTML;
      document.getElementById("textarea").innerHTML = "<p>You walk closer to the source of the light and the barred door, a guard stands outside of it and to the right, he sees you and smirks, then says. \"Ah... Finally awake I see, was worried you were never gonna wake up.\"</p>";
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
    } else if (command === "continue looking" || command === "2" || command === "2.") {
      previousState = document.getElementById("textarea").innerHTML;
      if (inventory.includes("lockpick")) {
        document.getElementById("textarea").innerHTML = "<p>You've found all you can here, only a mess of straw remains that used to be a makeshift bed.</p>";
      } else if (playerAttributes.intelligence >= 6) {
        document.getElementById("textarea").innerHTML = "<p>You continue to look around, all you see is the torch light shimmering and your dimly lit straw bed... Wait a minute... The flickering of the torch causes something to shine underneath the straw bed. You move some straw around... A lockpick!</p>";
        inventory.push("lockpick");
        document.getElementById("textarea").innerHTML += "<p>Lockpick added to inventory</p>";
      } else {
        document.getElementById("textarea").innerHTML = "<p>You continue to look around, but your mind is too clouded to notice anything unusual. Perhaps if you were more observant...</p>";
      }
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
    } else if (command === "check inventory" || command === "inventory") {
      previousState = document.getElementById("textarea").innerHTML;
      if (inventory.length === 0) {
        document.getElementById("textarea").innerHTML = "<p>Your inventory is empty.</p>";
      } else {
        document.getElementById("textarea").innerHTML = "<p>Your inventory contains: " + inventory.join(", ") + "</p>";
      }
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
    } else if (command === "go back") {
      if (previousState) {
        document.getElementById("textarea").innerHTML = previousState;
        // Check if we're going back to the initial state
        if (previousState.includes("You wake up in a dimly lit room")) {
          document.getElementById("buttonarea").innerHTML = '<button class="btn btn-primary" onclick="showDirections()">Continue</button>';
        } else {
          document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
          document.getElementById("usertext").value = "";
        }
      } else {
        alert("There's nothing to go back to!");
      }
    } else {
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
      alert("that is not a valid command please try again");
    }
  }
}

function startGame() {
  // Hide character creation
  document.getElementById("characterCreation").style.display = "none";
  document.getElementById("textarea").style.display = "block";
  document.getElementById("buttonarea").style.display = "block";
  
  // Display initial room
  currentRoom = Kitchen;
  displayRoomInfo(currentRoom);
  
  // Add continue button
  document.getElementById("buttonarea").innerHTML = '<button class="btn btn-primary" onclick="showDirections()">Continue</button>';
  
  // Remove any existing event listeners
  document.removeEventListener("keydown", handleCommand);
  
  // Add new event listener
  document.addEventListener("keydown", handleCommand);
}
