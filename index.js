const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}

let inventory = [];

class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.desc = description;
    this.action = action || "nothing happens";
    this.takeable = takeable || false;
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `You picked up ${this.name}`;
    } else {
      return "You can't take that!";
    }
  }

  use() {
    if (this.name === "desk" && inventory.includes("smallkey")) {
      return "You can open the drawer, inside is a large key";
    } else {
      return this.action;
    }
  }
}

let desk = new Item(
  "desk",
  "a small writing desk.\n There is a drawer.",
  "the desk is locked",
  undefined
);

let rug = new Item(
  "rug",
  "a faded rug",
  "you lift the rug, underneath is a small key."
);

let clock = new Item(
  "clock",
  "the clock keeps ticking away,\n there is no way to open it"
);

let smallkey = new Item(
  "smallkey",
  "a small key",
  "this looks like it would fit the lock on the desk",
  true
);

let largekey = new Item(
  "largekey",
  "a large key",
  "fits the lock on the door",
  true
);

let lookupTable = {
  desk: desk,
  rug: rug,
  clock: clock,
  smallkey: smallkey,
  "small key": smallkey,
  largekey: largekey,
};

async function play() {
  let userAction = await ask("What would you like to do?");

  let inputArray = userAction.toLowerCase().split(" ");

  let action = inputArray[0];

  let target = inputArray.slice(1).join(" ");

  if (action === "use") {
    console.log(lookupTable[target].use());

  } else if (action === "take") {
    if (lookupTable[target] instanceof Item) {
      console.log(lookupTable[target].take());
    } else {
      console.log(lookupTable[target] instanceof Item);
      console.log("That's not an item");
    }
  } else if (action === "examine") {
    console.log(lookupTable[target].desc);
  } else if (action === "leave") {
    if (inventory.includes("largekey")) {
      console.log("You open the door and are free!");
      process.exit();
    } else if (inventory.includes("smallkey")) {
      console.log("This small key does not fit the door...");
    } else {
      console.log("The door is locked");
    }
  } else {
    console.log("Invalid input please try again!");
  }
  return play()
}
console.log(
  "Welcome brave traveler to your DOOOOOOM!\nYou find yourself trapped in a small room.\nTo your left is a small desk and in the middle of the floor is a faded rug.\nTo your right is a grandfather clock and directly across from you is the door out"
);

play()