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
Kitchen.description = "You wake up in a dimly lit room, head throbbing with a painful bump on your head, stone slabs cover the floor and grey bricks for walls, all degrading as if they've been there for a hundred years or more. The light is coming from outside the room, just past a barred door, the only way in or out of it... Is this a dungeon?";
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
let stateHistory = [];

// Add at the top with other variables
let whyAmIHereAsked = false;

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
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center;'>1. Look around</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. Investigate the lightsource</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
        <button class="btn btn-primary" onclick="handleLookAround()">1. Look around</button>
        <button class="btn btn-primary" onclick="handleInvestigateLightsource()">2. Investigate the lightsource</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").focus();
  
  // Remove any existing event listeners
  document.removeEventListener("keydown", handleCommand);
  
  // Add new event listener
  document.addEventListener("keydown", handleCommand);
}

function showInventory() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  if (inventory.length === 0) {
    document.getElementById("textarea").innerHTML = "<p>Your inventory is empty.</p>";
  } else {
    document.getElementById("textarea").innerHTML = "<p>Your inventory contains: " + inventory.join(", ") + "</p>";
  }
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

// Create a separate function to handle commands
function handleCommand(event) {
  if (event.key === "Enter") {
    const command = document.getElementById("usertext").value.toLowerCase().trim();
    const currentText = document.getElementById("textarea").innerHTML;
    
    // Check if we're in the name input state
    if (currentText.includes("Well? What is it then?")) {
      return; // Let the name input handler handle this
    }
    
    // Handle inventory check first, as it should work in all states
    if (command === "check inventory" || command === "inventory") {
      stateHistory.push(currentText);
      if (inventory.length === 0) {
        document.getElementById("textarea").innerHTML = "<p>Your inventory is empty.</p>";
      } else {
        document.getElementById("textarea").innerHTML = "<p>Your inventory contains: " + inventory.join(", ") + "</p>";
      }
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
      document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
      document.getElementById("usertext").value = "";
      return;
    }
    
    // Handle first page commands
    if (currentText.includes("1. Look around") && currentText.includes("2. Investigate the lightsource")) {
      if (command === "1" || command === "1." || command === "look around") {
        handleLookAround();
        return;
      } else if (command === "2" || command === "2." || command === "investigate the lightsource" || command === "investigate lightsource") {
        handleInvestigateLightsource();
        return;
      } else if (command === "go back") {
        alert("There's nothing back there for you.");
        document.getElementById("buttonarea").innerHTML = `
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
              <button class="btn btn-primary" onclick="handleLookAround()">1. Look around</button>
              <button class="btn btn-primary" onclick="handleInvestigateLightsource()">2. Investigate the lightsource</button>
            </div>
            <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
          </div>
          <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
        document.getElementById("usertext").value = "";
        return;
      }
    }
    
    // Handle second page commands
    if (currentText.includes("Do you?")) {
      if (command === "1" || command === "1." || command === "investigate the lightsource" || command === "investigate lightsource") {
        handleInvestigateLightsource();
        return;
      } else if (command === "2" || command === "2." || command === "continue looking") {
        handleContinueLooking();
        return;
      } else if (command === "go back") {
        alert("There's nothing back there for you.");
        document.getElementById("buttonarea").innerHTML = `
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
              <button class="btn btn-primary" onclick="handleInvestigateLightsource()">1. Investigate the lightsource</button>
              <button class="btn btn-primary" onclick="handleContinueLooking()">2. Continue looking</button>
            </div>
            <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
          </div>
          <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
        document.getElementById("usertext").value = "";
        return;
      }
    }
    
    // Handle guard dialogue options
    if (currentText.includes("Why am I here?") || currentText.includes("Who are you?") || currentText.includes("Who am I?") || currentText.includes("Let me out you bastard")) {
      if (command === "1" || command === "1." || command === "why am i here") {
        handleWhyAmIHere();
        return;
      } else if (command === "2" || command === "2." || command === "who are you") {
        handleWhoAreYou();
        return;
      } else if (command === "3" || command === "3." || command === "who am i") {
        handleWhoAmI();
        return;
      } else if (command === "4" || command === "4." || command === "let me out you bastard" || command === "let me out you bastard i'll kill you") {
        handleLetMeOut();
        return;
      } else if (command === "go back") {
        handleGoBack();
        return;
      }
    }
    
    // Handle go back command for other states
    if (command === "go back") {
      handleGoBack();
      return;
    }
    
    // If no valid command was found, just clear the input
    document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
    document.getElementById("usertext").value = "";
  }
}

function handleLookAround() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>You look around the room, nothing but cold, hard stone and the barred door where the light is coming from</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-decoration: underline; text-align: center;'>Do you?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Investigate the lightsource</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. Continue looking (6+ intelligence required)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'inventory' to check your items)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
        <button class="btn btn-primary" onclick="handleInvestigateLightsource()">1. Investigate the lightsource</button>
        <button class="btn btn-primary" onclick="handleContinueLooking()">2. Continue looking</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleInvestigateLightsource() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>You walk closer to the source of the light and the barred door, a guard stands outside of it and to the right, holding a torch that casts flickering shadows across the walls. He sees you and smirks, then says. \"Ah... Finally awake I see, was worried you were never gonna wake up.\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Why am I here?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. Who are you?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>3. Who am I?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>4. Let me out you bastard, I'll kill you!</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'inventory' to check your items)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <button class="btn btn-primary" onclick="handleWhyAmIHere()">1. Why am I here?</button>
        <button class="btn btn-primary" onclick="handleWhoAreYou()">2. Who are you?</button>
        <button class="btn btn-primary" onclick="handleWhoAmI()">3. Who am I?</button>
        <button class="btn btn-primary" onclick="handleLetMeOut()">4. Let me out you bastard, I'll kill you!</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleContinueLooking() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
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
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleWhyAmIHere() {
  let responseText = "";
  if (whyAmIHereAsked) {
    responseText = "<p>\"Are you deaf or dumb? I just told you what I know!\"</p>";
  } else {
    responseText = "<p>\"Bad luck I suppose!\" The guard blutters with a chuckle. \"I just get paid to stand guard, not ask questions that don't concern me.\"</p>";
    whyAmIHereAsked = true;
  }
  
  responseText += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  
  // Save the current state before updating
  const currentState = document.getElementById("textarea").innerHTML;
  
  // Update the display
  document.getElementById("textarea").innerHTML = responseText;
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
  
  // Add the previous state to history
  stateHistory.push(currentState);
}

function handleWhoAreYou() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>\"Isn't it obvious?\" His smirk thinning. \"I'm your jailor, and if you misbehave, the last person you'll see!\" He says as he cackles to himself, showing off the wooden baton on his belt.</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Come on then, let's find out who'll be seeing their last!</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleChallengeGuard()">1. Come on then, let's find out who'll be seeing their last!</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleChallengeGuard() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>The guard's smirk fades as he grips his baton tightly. \"You've got spirit, I'll give you that. But you're in no condition to fight, not with that bump on your head. Maybe when you're feeling better... if you live that long.\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Oh I see, afraid of me are you?! (6+ charisma required)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleCharismaChallenge()">1. Oh I see, afraid of me are you?! (6+ charisma required)</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleCharismaChallenge() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  if (playerAttributes.charisma >= 6) {
    document.getElementById("textarea").innerHTML = "<p>\"A-afraid?! I'll show you something to be afraid of!\" He bellows before drawing his wooden baton, opening the door to the prison cell. He then, with a grimace on his face raises his baton and brings it down with force.</p>";
  } else {
    document.getElementById("textarea").innerHTML = "<p>The guard chuckles then says \"My you're a tough one ain't ya.\"</p>";
  }
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleWhoAmI() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>The guard pauses for a brief moment, looking you in the eyes then says. \"They must've hit you on the head hard before dragging your sorry self down here... You really don't know?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>1. Of course I do, it's...</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center;'>2. I... I have no idea</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type the number of the option you wish to choose)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <button class="btn btn-primary" onclick="handleRememberName()">1. Of course I do, it's...</button>
        <button class="btn btn-primary" onclick="handleNoMemory()">2. I... I have no idea</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleRememberName() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>\"Well? What is it then?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type your name using only letters, then press Enter or click Confirm)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; display: flex; gap: 10px;">
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px; flex: 1;" pattern="[A-Za-z]+" title="Please enter only letters" />
        <button class="btn btn-primary" onclick="handleNameInput()" style="margin-top: 10px;">Confirm</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <div style="display: flex; gap: 20px; margin-top: 10px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
    </div>`;
  document.getElementById("usertext").value = "";
  
  // Add event listener for name input
  document.getElementById("usertext").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      handleNameInput();
    }
  });
}

function handleNameInput() {
  const playerName = document.getElementById("usertext").value.trim();
  if (playerName) {
    stateHistory.push(document.getElementById("textarea").innerHTML);
    document.getElementById("textarea").innerHTML = "<p>The guard furrows his eyebrows \"" + playerName + "... Not the name I would've guessed... You look more like... a prisoner.\" The guard heckles.</p>";
    document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Click Continue to proceed)</p>";
    document.getElementById("buttonarea").innerHTML = `
      <div style="display: flex; gap: 20px;">
        <div style="flex: 1;">
          <button class="btn btn-primary" onclick="handleContinue()">Continue</button>
        </div>
        <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
      </div>`;
  }
}

function handleContinue() {
  // Add your continuation logic here
  // For now, it will just go back to the guard's dialogue options
  handleGoBack();
}

function handleNoMemory() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>The guard's smirk grows wider. \"Knocked the sense out of you they did... Oh well, as long as you respond to 'prisoner' we won't have any problems.\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleLetMeOut() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p>The guard tuts. \"Now now, none of that... We don't want another bump on the head now do we?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.8em;'>(Type 'go back' to return)</p>";
  document.getElementById("buttonarea").innerHTML = `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
      </div>
      <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
    </div>
    <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
  document.getElementById("usertext").value = "";
}

function handleGoBack() {
  if (stateHistory.length > 0) {
    const previousState = stateHistory.pop();
    
    // Check if we're going back to the guard dialogue options
    if (previousState.includes("Ah... Finally awake I see")) {
      document.getElementById("textarea").innerHTML = previousState;
      document.getElementById("buttonarea").innerHTML = `
        <div style="display: flex; gap: 20px;">
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <button class="btn btn-primary" onclick="handleWhyAmIHere()">1. Why am I here?</button>
            <button class="btn btn-primary" onclick="handleWhoAreYou()">2. Who are you?</button>
            <button class="btn btn-primary" onclick="handleWhoAmI()">3. Who am I?</button>
            <button class="btn btn-primary" onclick="handleLetMeOut()">4. Let me out you bastard, I'll kill you!</button>
          </div>
          <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
        </div>
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
    } else if (previousState.includes("1. Look around") && previousState.includes("2. Investigate the lightsource")) {
      document.getElementById("textarea").innerHTML = previousState;
      document.getElementById("buttonarea").innerHTML = `
        <div style="display: flex; gap: 20px;">
          <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
            <button class="btn btn-primary" onclick="handleLookAround()">1. Look around</button>
            <button class="btn btn-primary" onclick="handleInvestigateLightsource()">2. Investigate the lightsource</button>
          </div>
          <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
        </div>
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
    } else if (previousState.includes("You look around the room")) {
      document.getElementById("textarea").innerHTML = previousState;
      document.getElementById("buttonarea").innerHTML = `
        <div style="display: flex; gap: 20px;">
          <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
            <button class="btn btn-primary" onclick="handleInvestigateLightsource()">1. Investigate the lightsource</button>
            <button class="btn btn-primary" onclick="handleContinueLooking()">2. Continue looking</button>
          </div>
          <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
        </div>
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
    } else {
      document.getElementById("textarea").innerHTML = previousState;
      document.getElementById("buttonarea").innerHTML = `
        <div style="display: flex; gap: 20px;">
          <div style="flex: 1;">
            <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
          </div>
          <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
        </div>
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
    }
    
    document.getElementById("usertext").value = "";
    // Re-add the event listener after going back
    document.removeEventListener("keydown", handleCommand);
    document.addEventListener("keydown", handleCommand);
  } else {
    alert("There's nothing to go back to!");
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
