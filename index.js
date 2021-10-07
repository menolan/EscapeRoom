const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}

//ESCAPE!
console.log(
    "Welcome brave traveler to your DOOOOOOM!\nYou find yourself trapped in a small room.\nTo your left is a small desk and in the middle of the floor is a faded rug.\nTo your right is a grandfather clock and directly across from you is the door out"
  );