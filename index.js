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

class GameState {
  constructor() {
    this._playerHealth = 100;
    this._inventory = [];
    this._collectedItems = [];
    this._defeatedEnemies = [];
    this._gameOver = false;
    this._gameWon = false;
  }

  get playerHealth() {
    return this._playerHealth;
  }

  get inventory() {
    return this._inventory;
  }

  get collectedItems() {
    return this._collectedItems;
  }

  get defeatedEnemies() {
    return this._defeatedEnemies;
  }

  get gameOver() {
    return this._gameOver;
  }

  get gameWon() {
    return this._gameWon;
  }

  addToInventory(item) {
    if (!this._inventory.includes(item)) {
      this._inventory.push(item);
    }
  }

  removeFromInventory(item) {
    const index = this._inventory.indexOf(item);
    if (index > -1) {
      this._inventory.splice(index, 1);
    }
  }

  addCollectedItem(item) {
    if (!this._collectedItems.includes(item)) {
      this._collectedItems.push(item);
    }
  }

  addDefeatedEnemy(enemy) {
    if (!this._defeatedEnemies.includes(enemy)) {
      this._defeatedEnemies.push(enemy);
    }
  }

  takeDamage(amount) {
    this._playerHealth -= amount;
    if (this._playerHealth <= 0) {
      this._gameOver = true;
    }
  }

  heal(amount) {
    this._playerHealth = Math.min(100, this._playerHealth + amount);
  }

  checkWinCondition() {
    // Win if player has collected all required items and defeated all enemies
    const requiredItems = ['lockpick', 'key', 'weapon'];
    const requiredEnemies = ['guard', 'boss'];
    
    const hasAllItems = requiredItems.every(item => this._collectedItems.includes(item));
    const hasDefeatedAllEnemies = requiredEnemies.every(enemy => this._defeatedEnemies.includes(enemy));
    
    if (hasAllItems && hasDefeatedAllEnemies) {
      this._gameWon = true;
    }
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name);
    this._weakness = "";
    this._diceChallenge = false;
    this._diceThreshold = 0;
    this._health = 100;
    this._attackPower = 10;
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

  set health(value) {
    this._health = value;
  }

  set attackPower(value) {
    this._attackPower = value;
  }

  get health() {
    return this._health;
  }

  get attackPower() {
    return this._attackPower;
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

  takeDamage(amount) {
    this._health -= amount;
    return this._health <= 0;
  }

  attack(player) {
    const damage = Math.floor(Math.random() * this._attackPower) + 1;
    player.takeDamage(damage);
    return damage;
  }
}

// Space Station Game
class SpaceStationGame {
  constructor() {
    this._currentRoom = null;
    this._rooms = {};
    this._gameState = new GameState();
    this.initializeRooms();
  }

  initializeRooms() {
    // Create rooms
    const bridge = new Room("Bridge");
    bridge.description = "The main control room of the space station. Various control panels and monitors line the walls.";
    
    const engineering = new Room("Engineering");
    engineering.description = "The heart of the station's power systems. Warning lights flash intermittently.";
    
    const quarters = new Room("Crew Quarters");
    quarters.description = "Living space for the station's crew. Personal belongings are scattered about.";
    
    const airlock = new Room("Airlock");
    airlock.description = "The station's main entrance and exit point. A large window shows the vastness of space.";
    
    // Link rooms
    bridge.linkRoom("south", engineering);
    bridge.linkRoom("east", quarters);
    bridge.linkRoom("west", airlock);
    
    engineering.linkRoom("north", bridge);
    quarters.linkRoom("west", bridge);
    airlock.linkRoom("east", bridge);
    
    // Add characters
    const engineer = new Character("Engineer");
    engineer.description = "a stressed-looking crew member in a jumpsuit";
    engineer.conversation = "The reactor is unstable! We need to fix it before it's too late!";
    engineering.character = engineer;
    
    const captain = new Enemy("Captain");
    captain.description = "the station's commanding officer, now corrupted by an alien influence";
    captain.conversation = "You will not stop our plans for universal domination!";
    captain.health = 100;
    captain.attackPower = 15;
    captain.weakness = "plasma_rifle";
    bridge.character = captain;
    
    this._rooms = {
      bridge,
      engineering,
      quarters,
      airlock
    };
    
    this._currentRoom = bridge;
  }

  startGame() {
    displayRoomInfo(this._currentRoom);
  }

  move(direction) {
    const newRoom = this._currentRoom.move(direction);
    if (newRoom !== this._currentRoom) {
      this._currentRoom = newRoom;
      displayRoomInfo(this._currentRoom);
    }
  }
}

// Add at the top with other variables
let currentGame = null;

function startSpaceStationGame() {
  currentGame = new SpaceStationGame();
  currentGame.startGame();
}

function restartGame() {
  if (currentGame instanceof SpaceStationGame) {
    startSpaceStationGame();
  } else {
    startGame();
  }
}

// Update handleCommand to include space station game commands
function handleCommand(event) {
  if (event.key === "Enter") {
    const command = document.getElementById("usertext").value.toLowerCase().trim();
    const currentText = document.getElementById("textarea").innerHTML;
    
    // Handle space station game movement
    if (currentGame instanceof SpaceStationGame) {
      if (command === "north" || command === "south" || command === "east" || command === "west") {
        currentGame.move(command);
        return;
      }
    }
    
    // Handle continue command from initial room
    if (currentText.includes("Page 0") && command === "continue") {
      showDirections();
      return;
    }
    
    // Check if we're in the name input state
    if (currentText.includes("Well? What is it then?")) {
      handleNameInput();
      return;
    }
    
    // Handle guard's response to name
    if (currentText.includes("Not the name I would've guessed")) {
      if (command === "1" || command === "1.") {
        handleGuardLeaves();
        return;
      }
    }
    
    // Handle inventory check first, as it should work in all states
    if (command === "check inventory" || command === "inventory") {
      stateHistory.push(currentText);
      if (inventory.length === 0) {
        document.getElementById("textarea").innerHTML = "<p>Your inventory is empty.</p>";
      } else {
        document.getElementById("textarea").innerHTML = "<p>Your inventory contains: " + inventory.join(", ") + "</p>";
      }
      document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 0.9em;'>(Type 'go back' or '0' to return)</p>";
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
      } else if (command === "go back" || command === "0") {
        alert("There's nothing back there for you.");
        document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
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
      } else if (command === "go back" || command === "0") {
        alert("There's nothing back there for you.");
        document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
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
      } else if (command === "go back" || command === "0") {
        handleGoBack();
        return;
      }
    }
    
    // Handle challenge guard option
    if (currentText.includes("Come on then, let's find out who'll be seeing their last!")) {
      if (command === "1" || command === "1." || command === "challenge guard" || command === "challenge") {
        handleChallengeGuard();
        return;
      } else if (command === "go back" || command === "0") {
        handleGoBack();
        return;
      }
    }
    
    // Handle charisma challenge option
    if (currentText.includes("Oh I see, afraid of me are you?!")) {
      if (command === "1" || command === "1." || command === "taunt guard" || command === "taunt") {
        handleCharismaChallenge();
        return;
      } else if (command === "go back" || command === "0") {
        handleGoBack();
        return;
      }
    }
    
    // Handle who am I options
    if (currentText.includes("They must've hit you on the head hard before dragging your sorry self down here... You really don't know?")) {
      if (command === "1" || command === "1." || command === "of course i do" || command === "remember name") {
        handleRememberName();
        return;
      } else if (command === "2" || command === "2." || command === "i have no idea" || command === "no memory") {
        handleNoMemory();
        return;
      } else if (command === "go back" || command === "0") {
        handleGoBack();
        return;
      }
    }
    
    // Handle combat commands
    if (currentText.includes("Combat")) {
      if (command === "1" || command === "1." || command === "attack") {
        handleAttack(currentEnemy);
        return;
      } else if (command === "2" || command === "2." || command === "use item") {
        // Handle item usage
        return;
      }
    }
    
    // Handle game over/win screen
    if (currentText.includes("Game Over") || currentText.includes("Victory!")) {
      if (command === "1" || command === "1.") {
        restartGame();
        return;
      }
    }
    
    // Handle go back command for other states
    if (command === "go back" || command === "0") {
      handleGoBack();
      return;
    }
    
    // If no valid command was found, just clear the input
    document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" />';
    document.getElementById("usertext").value = "";
  }
}

function handleNameInput() {
  const playerName = document.getElementById("usertext").value.trim();
  if (playerName) {
    stateHistory.push(document.getElementById("textarea").innerHTML);
    document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 11</p>";
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard furrows his eyebrows \"" + playerName + "... Not the name I would've guessed... You look more like... a prisoner.\" The guard heckles.</p>";
    document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to continue</p>";
    document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
    document.getElementById("usertext").focus();
  }
}

function handleGuardLeaves() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 14</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Some fighting can be heard further in the dungeon, the guard curses, then says. \"Don't go anywhere.\" Before walking off in the direction of the noise.</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to continue</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
}

function handleLookAround() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 2</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You look around the room, nothing but cold, hard stone and the barred door where the light is coming from</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-decoration: underline; text-align: center; font-size: 1.3em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Do you?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Investigate the lightsource</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>2. Continue looking (6+ intelligence required)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to investigate the lightsource, '2' to continue looking, 'inventory' to check your items, or 'go back' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleInvestigateLightsource() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 3</p>";
  let guardText = "";
  if (hasTalkedToGuard) {
    guardText = "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard glares at you. \"Bored already are we?\"</p>";
  } else {
    guardText = "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You walk closer to the source of the light and the barred door, a guard stands outside of it and to the right, holding a torch that casts flickering shadows across the walls. He sees you and smirks, then says. \"Ah... Finally awake I see, was worried you were never gonna wake up.\"</p>";
    hasTalkedToGuard = true;
  }
  document.getElementById("textarea").innerHTML += guardText;
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Why am I here?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>2. Who are you?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>3. Who am I?</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>4. Let me out you bastard, I'll kill you!</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to ask why you're here, '2' to ask who the guard is, '3' to ask who you are, '4' to threaten the guard, 'inventory' to check your items, or 'go back' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleContinueLooking() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 4</p>";
  if (inventory.includes("lockpick")) {
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You've found all you can here, only a mess of straw remains that used to be a makeshift bed.</p>";
  } else if (playerAttributes.intelligence >= 6) {
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You continue to look around, all you see is the torch light shimmering and your dimly lit straw bed... Wait a minute... The flickering of the torch causes something to shine underneath the straw bed. You move some straw around... A lockpick!</p>";
    inventory.push("lockpick");
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Lockpick added to inventory</p>";
  } else {
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You continue to look around, but your mind is too clouded to notice anything unusual. Perhaps if you were more observant...</p>";
  }
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleWhyAmIHere() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 5</p>";
  let responseText = "";
  if (whyAmIHereAsked) {
    responseText = "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>\"Are you deaf or dumb? I just told you what I know!\"</p>";
  } else {
    responseText = "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>\"Bad luck I suppose!\" The guard blutters with a chuckle. \"I just get paid to stand guard, not ask questions that don't concern me.\"</p>";
    whyAmIHereAsked = true;
  }
  document.getElementById("textarea").innerHTML += responseText;
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleWhoAreYou() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 6</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>\"Isn't it obvious?\" His smirk thinning. \"I'm your jailor, and if you misbehave, the last person you'll see!\" He says as he cackles to himself, showing off the wooden baton on his belt.</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Come on then, let's find out who'll be seeing their last!</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to challenge the guard, 'inventory' to check your items, or 'go back' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleChallengeGuard() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 7</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard's smirk fades as he grips his baton tightly. \"You've got spirit, I'll give you that. But you're in no condition to fight, not with that bump on your head. Maybe when you're feeling better... if you live that long.\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Oh I see, afraid of me are you?! (6+ charisma required)</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to taunt the guard, 'inventory' to check your items, or 'go back' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleCharismaChallenge() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 8</p>";
  if (playerAttributes.charisma >= 6) {
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>\"A-afraid?! I'll show you something to be afraid of!\" He bellows before drawing his wooden baton, opening the door to the prison cell. He then, with a grimace on his face raises his baton and brings it down with force.</p>";
  } else {
    document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard chuckles then says \"My you're a tough one ain't ya.\"</p>";
  }
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleWhoAmI() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 9</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard pauses for a brief moment, looking you in the eyes then says. \"They must've hit you on the head hard before dragging your sorry self down here... You really don't know?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Of course I do, it's...</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>2. I... I have no idea</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to remember your name, '2' to admit you have no memory, 'inventory' to check your items, or 'go back' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleRememberName() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 10</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>\"Well? What is it then?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type your name using only letters, then press Enter</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleNoMemory() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 12</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard's smirk grows wider. \"Knocked the sense out of you they did... Oh well, as long as you respond to 'prisoner' we won't have any problems.\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleLetMeOut() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Page 13</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>The guard tuts. \"Now now, none of that... We don't want another bump on the head now do we?\"</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type 'go back' or '0' to return</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

function handleGoBack() {
  restoreState();
}

function startGame() {
  // Hide character creation
  document.getElementById("characterCreation").style.display = "none";
  document.getElementById("textarea").style.display = "block";
  document.getElementById("buttonarea").style.display = "block";
  
  // Display initial room
  currentRoom = Kitchen;
  displayRoomInfo(currentRoom);
  
  // Add text input
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
  
  // Remove any existing event listeners
  document.removeEventListener("keydown", handleCommand);
  
  // Add new event listener
  document.addEventListener("keydown", handleCommand);
}

function saveState() {
  const currentText = document.getElementById("textarea").innerHTML;
  const currentButtons = document.getElementById("buttonarea").innerHTML;
  
  stateHistory.push({
    text: currentText,
    buttons: currentButtons
  });
}

function restoreState() {
  if (stateHistory.length > 0) {
    const previousState = stateHistory.pop();
    if (previousState && typeof previousState === 'object') {
      document.getElementById("textarea").innerHTML = previousState.text;
      document.getElementById("buttonarea").innerHTML = previousState.buttons;
      document.getElementById("usertext").value = "";
      document.getElementById("usertext").focus();
      // Re-add the event listener after going back
      document.removeEventListener("keydown", handleCommand);
      document.addEventListener("keydown", handleCommand);
    } else {
      // Fallback for old state format
      document.getElementById("textarea").innerHTML = previousState;
      document.getElementById("buttonarea").innerHTML = `
        <div style="display: flex; gap: 20px;">
          <div style="flex: 1;">
            <button class="btn btn-primary" onclick="handleGoBack()">Go Back</button>
          </div>
          <button class="btn btn-secondary" onclick="showInventory()" style="align-self: flex-start;">Inventory</button>
        </div>
        <input type="text" id="usertext" autocomplete="off" style="margin-top: 10px;" />`;
      document.getElementById("usertext").focus();
    }
  } else {
    alert("There's nothing to go back to!");
  }
}

function handleCombat(enemy) {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Combat</p>";
  document.getElementById("textarea").innerHTML += `<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Your health: ${gameState.playerHealth}</p>`;
  document.getElementById("textarea").innerHTML += `<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>${enemy.name}'s health: ${enemy.health}</p>`;
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>1. Attack</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.3em; font-weight: bold; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>2. Use Item</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to attack, '2' to use an item, or 'inventory' to check your items</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
}

function handleAttack(enemy) {
  const damage = Math.floor(Math.random() * 15) + 5; // Player deals 5-20 damage
  const enemyDefeated = enemy.takeDamage(damage);
  
  if (enemyDefeated) {
    gameState.addDefeatedEnemy(enemy.name.toLowerCase());
    gameState.checkWinCondition();
    if (gameState.gameWon) {
      showWinScreen();
    } else {
      showVictoryMessage(enemy);
    }
  } else {
    const enemyDamage = enemy.attack(gameState);
    document.getElementById("textarea").innerHTML += `<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You deal ${damage} damage!</p>`;
    document.getElementById("textarea").innerHTML += `<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>${enemy.name} deals ${enemyDamage} damage!</p>`;
    
    if (gameState.gameOver) {
      showGameOverScreen();
    } else {
      handleCombat(enemy);
    }
  }
}

function showVictoryMessage(enemy) {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Victory!</p>";
  document.getElementById("textarea").innerHTML += `<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You have defeated ${enemy.name}!</p>`;
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to continue</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
}

function showGameOverScreen() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Game Over</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You have been defeated...</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to restart</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
}

function showWinScreen() {
  stateHistory.push(document.getElementById("textarea").innerHTML);
  document.getElementById("textarea").innerHTML = "<p style='text-align: center; font-weight: bold; font-size: 1.5em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>Victory!</p>";
  document.getElementById("textarea").innerHTML += "<p style='font-size: 1.2em; color: #00FF00; text-shadow: 0 0 5px #00FF00;'>You have collected all required items and defeated all enemies!</p>";
  document.getElementById("textarea").innerHTML += "<p style='text-align: center; font-size: 1.1em; font-weight: bold; color: #FFFF00; text-shadow: 0 0 5px #FFFF00; margin-top: 20px;'>Type '1' to restart</p>";
  document.getElementById("buttonarea").innerHTML = '<input type="text" id="usertext" autocomplete="off" style="font-size: 1.2em; padding: 10px; width: 100%;" />';
  document.getElementById("usertext").focus();
}

// Update the guard creation
const guard = new Enemy("Guard");
guard.description = "a burly guard with a wooden baton";
guard.conversation = "Ah... Finally awake I see, was worried you were never gonna wake up.";
guard.health = 50;
guard.attackPower = 8;
guard.weakness = "weapon";
